import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../core/contracts/UserRepository';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../core/entities/User';
import { SequelizeUserModel, UserModelAttributes } from './user.model';
import { ErrorRepositoryService } from 'src/users/app/errors/ErrorRepositoryService';
import { SequelizeUserMapper } from './user.mapper';
import { BaseSequelizeRepository } from 'src/shared/infrastructure/persistence/sequelize/sequelize.base-repository';

@Injectable()
export class SequelizeUserRepository
  extends BaseSequelizeRepository<
    User,
    UserModelAttributes,
    SequelizeUserModel,
    string
  >
  implements UserRepository
{
  constructor(
    @InjectModel(SequelizeUserModel)
    private readonly userModel: typeof SequelizeUserModel,
  ) {
    super(userModel, new SequelizeUserMapper());
  }

  async create(user: User): Promise<boolean> {
    try {
      const userPersistence = this.mapper.toPersistence(user);
      const record = await this.userModel.create(userPersistence);
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
      const record = await this.userModel.findOne({
        where: { username },
        include: [
          {
            association: 'roles',
            include: [{ association: 'permissions' }],
          },
        ],
      });
      if (!record) {
        return null;
      }
      return this.mapper.toDomain(record.get({ plain: true }));
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por por la propiedad username',
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
      const record = await this.userModel.findOne({ where: { username } });
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

  async emailExists(email: string): Promise<boolean> {
    try {
      const record = await this.userModel.findOne({ where: { email } });
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
