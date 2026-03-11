import { Command } from 'src/shared/app/bus/command';
import { LoanableType } from '../../core/entities/LoanableType';

export class RequestLoanCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly requesterId: string,
    public readonly targetId: string,
    public readonly targetType: LoanableType,
    public readonly notes?: string,
  ) {}
}
