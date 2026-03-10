import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus } from 'src/shared/app/bus/command-bus';
import { Command } from 'src/shared/app/bus/command';

@Injectable()
export class NestCommandBus implements CommandBus {
  private handlers = new Map<string, any>();

  constructor(private moduleRef: ModuleRef) {}

  register(command: Type<Command>, useCase: any) {
    this.handlers.set(command.name, useCase);
  }

  async execute<T>(command: Command): Promise<T> {
    const useCaseType = this.handlers.get(command.constructor.name);
    if (!useCaseType) {
      throw new Error(`No hay un caso de uso para ${command.constructor.name}`);
    }
    const useCase = this.moduleRef.get(useCaseType, { strict: false });
    return useCase.execute(command);
  }
}
