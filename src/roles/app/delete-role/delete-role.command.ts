import { Command } from 'src/shared/app/bus/command';

export class DeleteRoleCommand implements Command {
  constructor(public readonly props: { id: string }) {}
}
