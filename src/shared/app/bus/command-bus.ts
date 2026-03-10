import { Command } from './command';

export const COMMAND_BUS = Symbol('CommandBus');

export interface CommandBus {
  execute<T>(command: Command): Promise<T>;
}
