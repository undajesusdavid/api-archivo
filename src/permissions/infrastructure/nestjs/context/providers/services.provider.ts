import { SequelizePermissionRepository } from '../../../../../permissions/infrastructure/persistence/sequelize/permission.repository';
import { PERMISSION_REPOSITORY } from 'src/permissions/core/contracts/PermissionRepository';

export const ServicesProvider = [
  {
    provide: PERMISSION_REPOSITORY,
    useClass: SequelizePermissionRepository,
  },
];
