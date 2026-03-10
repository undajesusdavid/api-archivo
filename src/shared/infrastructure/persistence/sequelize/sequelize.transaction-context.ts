import { AsyncLocalStorage } from 'node:async_hooks';

export const transactionStorage = new AsyncLocalStorage<any>();
