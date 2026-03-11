import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RoleRepository } from 'src/roles/core/contracts/RoleRepository';
import { Role } from 'src/roles/core/entities/Role';
import { TypeormRoleModel } from './role.model';
import { TypeOrmRoleMapper } from './role.mapper';
import { ErrorRepositoryService } from 'src/shared/app/errors/ErrorRepositoryService';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { TypeormPermissionModel } from '../../../../permissions/infrastructure/persistence/typeorm/permission.model';

@Injectable()
export class TypeOrmRoleRepository
  extends BaseTypeOrmRepository<Role, TypeormRoleModel, string>
  implements RoleRepository
{
  constructor(
    @InjectRepository(TypeormRoleModel)
    private readonly roleRepository: Repository<TypeormRoleModel>,
    @InjectRepository(TypeormPermissionModel)
    private readonly permissionRepository: Repository<TypeormPermissionModel>,
  ) {
    super(roleRepository, new TypeOrmRoleMapper());
  }

  async create(role: Role): Promise<void> {
    try {
      const rolePersistence = this.mapper.toPersistence(role);
      
      // Manejar permisos si existen
      const permissionIds = role.getPermissions();
      if (permissionIds.length > 0) {
        const permissions = await this.permissionRepository.find({
          where: { id: In(permissionIds) } as any,
        });
        rolePersistence.permissions = permissions;
      }

      await this.entityRepository.save(rolePersistence);
    } catch (error) {
      console.log('Error en metodo create del repositorio de roles ', error);
      throw new ErrorRepositoryService(
        'Error al intentar registrar el rol',
        'ROLES_CREATE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'create',
        },
      );
    }
  }

  async assignPermissions(
    roleId: string,
    permissionIds: number[],
  ): Promise<void> {
    const role = await this.entityRepository.findOne({
      where: { id: roleId } as any,
      relations: ['permissions'],
    });

    if (!role) {
      throw new ErrorRepositoryService('Rol no encontrado', 'ROLES_NOT_FOUND', {
        originalError: null,
        class: this.constructor.name,
        method: 'assignPermissions',
      });
    }

    try {
      const permissions = await this.permissionRepository.find({
        where: { id: In(permissionIds) } as any,
      });
      role.permissions = permissions;
      await this.entityRepository.save(role);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar asignar permisos al rol',
        'ROLES_ASSIGN_PERMISSIONS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'assignPermissions',
        },
      );
    }
  }

  async findByName(name: string): Promise<Role | null> {
    try {
      const role = await this.entityRepository.findOne({
        where: { name } as any,
        relations: ['permissions'],
      });
      if (!role) return null;
      return this.mapper.toDomain(role);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el rol por nombre',
        'ROLES_FINDBYNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByName',
        },
      );
    }
  }
}
