import { Module } from '@nestjs/common';
import { TypeOrmModuleConfig } from 'src/shared/infrastructure/persistence/typeorm/typeorm.config';
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { NestCommandBus } from '../bus/nest-command-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestQueryBus } from '../bus/nest-query-bus';
import { UNIT_OF_WORK } from 'src/shared/core/interfaces/unit-of-work.interface';
import { TypeOrmUnitOfWork } from 'src/shared/infrastructure/persistence/typeorm/typeorm.unit-of.work';
import { UuidService } from 'src/shared/infrastructure/base/services/uuid.service';
import { UUID_SERVICE } from 'src/shared/core/interfaces/uuid-service.interface';

@Module({
  imports: [TypeOrmModuleConfig],
  providers: [
    { provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork },
    { provide: COMMAND_BUS, useClass: NestCommandBus },
    { provide: QUERY_BUS, useClass: NestQueryBus },
    { provide: UUID_SERVICE, useClass: UuidService },
  ],
  exports: [UNIT_OF_WORK, UUID_SERVICE, COMMAND_BUS, QUERY_BUS],
})
export class SharedModule {}
