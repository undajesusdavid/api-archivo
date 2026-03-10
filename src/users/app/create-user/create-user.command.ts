import { Command } from 'src/shared/app/bus/command';

export class CreateUserCommand implements Command {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
  ) {}
}
