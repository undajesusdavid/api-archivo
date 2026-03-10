import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';

//CONTROLLERS
import { RoleController } from '../controllers/role.controller';

//IMPORTS

import { SharedModule } from 'src/shared/infrastructure/adapters/nest/context/shared.module';
import { PermissionModule } from 'src/permissions/infrastructure/nestjs/context/permission.module';
import { PersistenceModels } from './imports/persistence-models.import';

//EXPORTS
import { ServiceExports } from './exports/service.exports';
import { UseCaseExports } from './exports/use-case.exports';

//PROVIDERS
import { ServicesProvider } from './providers/services.provider';
import { UseCasesProvider } from './providers/use-cases.provider';
import { MappersProvider } from './providers/mappers.provider';

// PATRONES DE DISEÑO
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestCommandBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-query-bus';

// CASOS DE USOS Y COMMANDS
import { CreateRoleCommand } from 'src/roles/app/create-role/create-role.command';
import { CreateRoleUseCase } from 'src/roles/app/create-role/create-role.use-case';
import { DeleteRoleCommand } from 'src/roles/app/delete-role/delete-role.command';
import { DeleteRoleUseCase } from 'src/roles/app/delete-role/delete-role.use-case';
import { UpdateRoleCommand } from 'src/roles/app/update-role/update-role.command';
import { UpdateRoleUseCase } from 'src/roles/app/update-role/update-role.use-case';
import { NestBaseModule } from 'src/shared/infrastructure/adapters/nest/bus/base-module';

@Module({
  imports: [SharedModule, PermissionModule, ...PersistenceModels],
  controllers: [RoleController],
  providers: [...ServicesProvider, ...UseCasesProvider, ...MappersProvider],
  exports: [...ServiceExports, ...UseCaseExports],
})
export class RolesModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Roles', commandBus, queryBus);
  }

  protected registerCommands(): void {
    this.commandBus.register(CreateRoleCommand, CreateRoleUseCase);
    this.commandBus.register(DeleteRoleCommand, DeleteRoleUseCase);
    this.commandBus.register(UpdateRoleCommand, UpdateRoleUseCase);
  }

  protected registerQueries(): void {}
}
