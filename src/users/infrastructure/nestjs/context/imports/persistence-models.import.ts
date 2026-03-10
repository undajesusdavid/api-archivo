//Models
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeUserModel } from '../../../persistence/sequelize/user.model';
import { SequelizeUserRoleModel } from '../../../persistence/sequelize/user_roles.model';

const SequelizeModels = SequelizeModule.forFeature([
  SequelizeUserModel,
  SequelizeUserRoleModel,
]);

export const PersistenceModels = [SequelizeModels];
