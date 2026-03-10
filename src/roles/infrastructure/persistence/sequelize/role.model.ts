import { Model } from 'sequelize-typescript';
import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { SequelizePermissionModel } from 'src/permissions/infrastructure/persistence/sequelize/permission.model';
import { SequelizeUserModel } from 'src/users/infrastructure/persistence/sequelize/user.model';
import { SequelizeUserRoleModel } from 'src/users/infrastructure/persistence/sequelize/user_roles.model';
import { SequelizeRolePermissionModel } from './role_permission.model';

export interface RoleModelAttributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions?: number[];
  users?: string[];
}

@Table({ tableName: 'ac_roles' })
export class SequelizeRoleModel extends Model<RoleModelAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare isActive: boolean;

  @BelongsToMany(
    () => SequelizePermissionModel,
    () => SequelizeRolePermissionModel,
  )
  declare permissions: SequelizePermissionModel[];

  @BelongsToMany(() => SequelizeUserModel, () => SequelizeUserRoleModel)
  declare users: SequelizeUserModel[];
}
