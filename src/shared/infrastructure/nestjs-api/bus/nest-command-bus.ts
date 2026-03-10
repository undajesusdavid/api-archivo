// src/shared/infrastructure/bus/nest-command-bus.ts
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus } from '../../../app/bus/command-bus';
import { Command } from '../../../app/bus/command';

@Injectable()
export class NestCommandBus implements CommandBus {
  private handlers = new Map<string, any>();

  constructor(private moduleRef: ModuleRef) {}

  // Registramos qué comando va con qué caso de uso
  register(command: Type<Command>, useCase: any) {
    this.handlers.set(command.name, useCase);
  }

  async execute<T>(command: Command): Promise<T> {
    const useCaseType = this.handlers.get(command.constructor.name);
    if (!useCaseType) {
      throw new Error(`No hay un caso de uso para ${command.constructor.name}`);
    }

    // Obtenemos la instancia desde el contenedor de NestJS
    const useCase = this.moduleRef.get(useCaseType, { strict: false });
    return useCase.execute(command);
  }
}
