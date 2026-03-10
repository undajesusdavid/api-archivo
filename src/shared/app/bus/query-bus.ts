import { Query } from './query';

export const QUERY_BUS = Symbol('QueryBus');

export interface QueryBus {
  execute<T>(query: Query): Promise<T>;
}
