import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleRepository } from 'src/roles/core/contracts/RoleRepository';
import { Role } from 'src/roles/core/entities/Role';
import { SequelizeRoleModel, RoleModelAttributes as Att } from './role.model';
import { SequelizeRoleMapper } from './role.mapper';
import { ErrorRepositoryService } from 'src/shared/app/errors/ErrorRepositoryService';
import { BaseSequelizeRepository } from 'src/shared/infrastructure/persistence/sequelize/sequelize.base-repository';

@Injectable()
export class SequelizeRoleRepository
  extends BaseSequelizeRepository<Role, Att, SequelizeRoleModel, string>
  implements RoleRepository
{
  constructor(
    @InjectModel(SequelizeRoleModel)
    private readonly roleModel: typeof SequelizeRoleModel,
  ) {
    super(roleModel, new SequelizeRoleMapper());
  }

  async create(role: Role): Promise<void> {
    const transaction = await this.roleModel.sequelize!.transaction();
    const rolePersistence = this.mapper.toPersistence(role);
    try {
      const createdRole = await this.roleModel.create(rolePersistence, {
        transaction,
      });
      await (createdRole as any).setPermissions(role.getPermissions(), {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
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
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new ErrorRepositoryService('Rol no encontrado', 'ROLES_NOT_FOUND', {
        originalError: null,
        class: this.constructor.name,
        method: 'assignPermissions',
      });
    }
    try {
      await role.$set('permissions', permissionIds);
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
      const role = await this.modelEntity.findOne({
        where: { name },
        transaction: this.currentTransaction,
      });
      if (!role) return null;
      return this.mapper.toDomain(role.get({ plain: true }));
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar optener el rol por nombre',
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
