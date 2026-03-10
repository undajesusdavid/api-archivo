import { Inject, Module } from '@nestjs/common';

//CONTROLLERS
import { PermissionController } from '../controllers/permission.controller';

//IMPORTS
import { SharedModule } from 'src/shared/infrastructure/adapters/nest/context/shared.module';
import { PersistenceModels } from './imports/persistence-models.import';

//EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

//PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';
import { NestBaseModule } from 'src/shared/infrastructure/adapters/nest/bus/base-module';
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestCommandBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-query-bus';

@Module({
  imports: [SharedModule, ...PersistenceModels],
  controllers: [PermissionController],
  providers: [...ServicesProvider, ...UseCasesProvider, ...MappersProvider],
  exports: [...ServiceExports, ...UseCaseExports],
})
export class PermissionModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Permissions', commandBus, queryBus);
  }

  protected registerCommands(): void {
    // Register command handlers here if needed
    // Example:
    // this.registerCommandHandler(CreatePermissionCommand, CreatePermissionHandler);
  }

  protected registerQueries(): void {
    // Register query handlers here if needed
    // Example:
    // this.registerQueryHandler(GetPermissionQuery, GetPermissionHandler);
  }
}
