//Models de Sequelize
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeRoleModel } from '../../../persistence/sequelize/role.model';
import { SequelizePermissionModel } from '../../../../../permissions/infrastructure/persistence/sequelize/permission.model';
import { SequelizeRolePermissionModel } from '../../../persistence/sequelize/role_permission.model';

const SequelizeModels = SequelizeModule.forFeature([
  SequelizeRoleModel,
  SequelizePermissionModel,
  SequelizeRolePermissionModel,
]);

export const PersistenceModels = [SequelizeModels];
