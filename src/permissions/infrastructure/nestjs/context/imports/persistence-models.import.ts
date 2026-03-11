//Models de TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormPermissionModel } from '../../../persistence/typeorm/permission.model';

const TypeOrmModels = TypeOrmModule.forFeature([TypeormPermissionModel]);

export const PersistenceModels = [TypeOrmModels];
