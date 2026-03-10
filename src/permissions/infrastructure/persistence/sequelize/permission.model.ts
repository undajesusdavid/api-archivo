// permission.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  BelongsToMany,
  AutoIncrement,
} from 'sequelize-typescript';

import { SequelizeRoleModel } from '../../../../roles/infrastructure/persistence/sequelize/role.model';
import { SequelizeRolePermissionModel } from '../../../../roles/infrastructure/persistence/sequelize/role_permission.model';

export interface PermissionModelAttributes {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

@Table({
  tableName: 'ac_permisos',
  timestamps: true,
})
export class SequelizePermissionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare isActive: boolean;

  @BelongsToMany(() => SequelizeRoleModel, () => SequelizeRolePermissionModel)
  roles: SequelizeRoleModel[];

  // @BelongsToMany(() => RoleModel, 'ac_role_permissions', 'permissionId', 'roleId')
  // roles: RoleModel[];
}
