import { Logger, OnModuleInit } from '@nestjs/common';
import { NestCommandBus } from './nest-command-bus';
import { NestQueryBus } from './nest-query-bus';

export abstract class NestBaseModule implements OnModuleInit {
  protected readonly logger: Logger;
  constructor(
    protected readonly moduleName: string,
    protected readonly commandBus: NestCommandBus,
    protected readonly queryBus: NestQueryBus,
  ) {
    this.logger = new Logger(moduleName);
  }

  onModuleInit() {
    this.registerCommands();
    this.registerQueries();
    this.logger.log(`Módulo ${this.moduleName} inicializado`);
  }

  // Métodos que cada módulo hijo debe implementar
  protected abstract registerCommands(): void;
  protected abstract registerQueries(): void;
}
