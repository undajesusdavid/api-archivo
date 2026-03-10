// src/shared/infrastructure/bus/nest-query-bus.ts
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { QueryBus } from '../../../app/bus/query-bus';
import { Query } from '../../../app/bus/query';

@Injectable()
export class NestQueryBus implements QueryBus {
  private handlers = new Map<string, Type<any>>();

  constructor(private readonly moduleRef: ModuleRef) {}

  register(query: Type<Query>, handler: Type<any>) {
    this.handlers.set(query.name, handler);
  }

  async execute<T>(query: Query): Promise<T> {
    const queryName = query.constructor.name;
    const handlerType = this.handlers.get(queryName);

    if (!handlerType) {
      throw new Error(`[QueryBus] No hay un Handler para: ${queryName}`);
    }

    const handlerInstance = this.moduleRef.get(handlerType, { strict: false });
    return handlerInstance.execute(query);
  }
}
