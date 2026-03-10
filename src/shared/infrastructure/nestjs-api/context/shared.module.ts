import { Module } from '@nestjs/common';
//ORMS
import { TypeOrmModuleConfig } from '../../persistence/typeorm/typeorm.config'; // TypeORM
import { SequelizeConfigService } from '../../persistence/sequelize/sequelize.config'; // Sequelize

// PATRON COMMAND BUS
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { NestCommandBus } from '../bus/nest-command-bus'; // Nestjs

// PATRON  QUERY BUS
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestQueryBus } from '../bus/nest-query-bus'; // Nestjs

// PATRON UNIT OF WORK
import { UNIT_OF_WORK } from '../../../core/interfaces/unit-of-work.interface';
import { SequelizeUnitOfWork } from '../../persistence/sequelize/sequelize.unit-of-work'; // Sequelize

// SERVICIOS PERZONALIZADOS
import { UuidService } from '../../base/services/uuid.service';
import { UUID_SERVICE } from 'src/shared/core/interfaces/uuid-service.interface';

@Module({
  imports: [SequelizeConfigService, TypeOrmModuleConfig],
  providers: [
    {
      provide: UNIT_OF_WORK,
      useClass: SequelizeUnitOfWork,
    },
    {
      provide: COMMAND_BUS,
      useClass: NestCommandBus,
    },
    {
      provide: QUERY_BUS,
      useClass: NestQueryBus,
    },
    {
      provide: UUID_SERVICE,
      useClass: UuidService,
    },
  ],
  exports: [UNIT_OF_WORK, UUID_SERVICE, COMMAND_BUS, QUERY_BUS],
})
export class SharedModule {}
