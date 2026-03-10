import { Command } from 'src/shared/app/bus/command';

export class UpdateRoleCommand implements Command {
  constructor(
    public readonly props: {
      id: string;
      data: {
        name?: string;
        description?: string;
        isActive?: boolean;
        permissions?: number[];
      };
    },
  ) {}
}
