//Models de Sequelize
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizePermissionModel } from '../../../../../permissions/infrastructure/persistence/sequelize/permission.model';

const SequelizeModels = SequelizeModule.forFeature([SequelizePermissionModel]);

export const PersistenceModels = [SequelizeModels];
