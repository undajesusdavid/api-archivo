import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { SequelizeRoleModel } from './role.model';
import { SequelizePermissionModel } from '../../../../permissions/infrastructure/persistence/sequelize/permission.model';

@Table({ tableName: 'ac_role_permissions' })
export class SequelizeRolePermissionModel extends Model {
  @ForeignKey(() => SequelizeRoleModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare roleId: number;

  @ForeignKey(() => SequelizePermissionModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare permissionId: number;
}
