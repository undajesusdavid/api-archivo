import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserRepository } from '../../../core/contracts/UserRepository';
import { User } from '../../../core/entities/User';
import { UserOrmEntity } from './user.model';
import { ErrorRepositoryService } from 'src/users/app/errors/ErrorRepositoryService';
import { TypeOrmUserMapper } from './user.mapper';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { TypeormRoleModel } from '../../../../roles/infrastructure/persistence/typeorm/role.model';

@Injectable()
export class TypeOrmUserRepository
  extends BaseTypeOrmRepository<User, UserOrmEntity, string>
  implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    @InjectRepository(TypeormRoleModel)
    private readonly roleRepository: Repository<TypeormRoleModel>,
  ) {
    super(userRepository, new TypeOrmUserMapper());
  }

  async create(user: User): Promise<boolean> {
    try {
      const userPersistence = this.mapper.toPersistence(user);

      // Manejar roles si existen
      const roleNames = user.getRoles();
      if (roleNames.length > 0) {
        const roles = await this.roleRepository.find({
          where: { name: In(roleNames) } as any,
        });
        userPersistence.roles = roles;
      }

      const record = await this.entityRepository.save(userPersistence);
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar crear el usuario',
        'USER_CREATE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'create',
        },
      );
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const record = await this.entityRepository.findOne({
        where: { username } as any,
        relations: ['roles', 'roles.permissions'],
      });
      if (!record) {
        return null;
      }
      return this.mapper.toDomain(record);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por la propiedad username',
        'USER_GET_BY_USERNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByUsername',
        },
      );
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    try {
      const record = await this.entityRepository.findOne({
        where: { username } as any,
      });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el nombre de usuario ya existe',
        'USERNAME_EXISTS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'usernameExists',
        },
      );
    }
  }

  async assingRoles(userId: string, roleIds: string[]): Promise<void> {
    try {
      // 1. Buscamos al usuario incluyendo su relación de roles actual
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles'] // Asegúrate de que el nombre coincida con el definido en tu Entity
      });

      if (!user) throw new Error("No existe el usuario");

      // 2. Mapeamos los IDs a objetos de tipo Role (TypeORM necesita las entidades o al menos sus IDs)
      // Nota: Se asume que tienes acceso a RoleRepository o puedes pasar objetos con el ID
      user.roles = roleIds.map(id => ({ id } as any));

      // 3. Guardamos los cambios. TypeORM gestionará automáticamente la tabla intermedia
      await this.userRepository.save(user);

    } catch (error) {
      // Es buena práctica relanzar el error o manejarlo según tu política de logs
      throw new ErrorRepositoryService(
        'Error al intentar asignar el rol al usuario',
        'ASSING_ROLES_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'assingRoles',
        },
      );
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const record = await this.entityRepository.findOne({
        where: { email } as any,
      });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el email ya existe',
        'EMAIL_EXISTS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'emailExists',
        },
      );
    }
  }
}
