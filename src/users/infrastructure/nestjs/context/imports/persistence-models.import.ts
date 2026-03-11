//Models de TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../../../persistence/typeorm/user.model';
import { TypeormRoleModel } from '../../../../../roles/infrastructure/persistence/typeorm/role.model';

const TypeOrmModels = TypeOrmModule.forFeature([
  UserOrmEntity,
  TypeormRoleModel,
]);

export const PersistenceModels = [TypeOrmModels];
