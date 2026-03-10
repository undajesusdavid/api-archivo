import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';
import { SequelizeRoleModel } from 'src/roles/infrastructure/persistence/sequelize/role.model';
import { SequelizeUserRoleModel } from './user_roles.model';

export interface UserModelAttributes {
  id: string;
  username: string;
  password: string;
  email: string;
  active: boolean;
  roles?: SequelizeRoleModel[];
}

@Table({
  createdAt: false,
  updatedAt: false,
  tableName: 'usuarios',
  // opcional, si no usas createdAt/updatedAt
})
export class SequelizeUserModel
  extends Model<UserModelAttributes>
  implements UserModelAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare username: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare active: boolean;

  @BelongsToMany(() => SequelizeRoleModel, () => SequelizeUserRoleModel)
  declare roles: SequelizeRoleModel[];
}
