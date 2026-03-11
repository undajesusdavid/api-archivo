import { Command } from 'src/shared/app/bus/command';

export class ApproveLoanCommand implements Command {
  constructor(
    public readonly loanId: string,
    public readonly archivistId: string,
    public readonly dueDate: Date,
  ) {}
}
