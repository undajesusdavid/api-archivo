// src/shared/infrastructure/persistence/transaction-context.ts
import { AsyncLocalStorage } from 'async_hooks';
import { EntityManager } from 'typeorm';

/**
 * Este es el almacén de estado asíncrono.
 * Guardaremos aquí el EntityManager (que contiene la transacción).
 */
export const transactionStorage = new AsyncLocalStorage<EntityManager>();
