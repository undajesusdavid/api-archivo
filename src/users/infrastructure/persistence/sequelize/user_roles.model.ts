import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { SequelizeUserModel } from './user.model';
import { SequelizeRoleModel } from '../../../../roles/infrastructure/persistence/sequelize/role.model';

@Table({ tableName: 'user_roles' })
export class SequelizeUserRoleModel extends Model {
  @ForeignKey(() => SequelizeUserModel)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @ForeignKey(() => SequelizeRoleModel)
  @Column({ type: DataType.INTEGER })
  declare roleId: number;
}
