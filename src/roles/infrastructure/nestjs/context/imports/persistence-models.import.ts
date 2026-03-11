//Models de TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormRoleModel } from '../../../persistence/typeorm/role.model';
import { TypeormPermissionModel } from '../../../../../permissions/infrastructure/persistence/typeorm/permission.model';

const TypeOrmModels = TypeOrmModule.forFeature([
  TypeormRoleModel,
  TypeormPermissionModel,
]);

export const PersistenceModels = [TypeOrmModels];
