import { Command } from 'src/shared/app/bus/command';

export class CreateBoxCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly locationCode: string,
    public readonly metadata?: Record<string, any>,
    public readonly conservationStatus?: string,
  ) {}
}
