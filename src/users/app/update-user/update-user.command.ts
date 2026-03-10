import { Command } from 'src/shared/app/bus/command';

interface UpdateUserProps {
  readonly id: string;
  readonly data: {
    readonly username?: string;
    readonly email?: string;
    readonly active?: boolean;
  };
}

export class UpdateUserCommand implements Command {
  constructor(public readonly props: UpdateUserProps) {}
}
