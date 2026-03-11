import { TypeOrmPermissionRepository } from '../../../persistence/typeorm/permission.repository';
import { PERMISSION_REPOSITORY } from 'src/permissions/core/contracts/PermissionRepository';

export const ServicesProvider = [
  {
    provide: PERMISSION_REPOSITORY,
    useClass: TypeOrmPermissionRepository,
  },
];
