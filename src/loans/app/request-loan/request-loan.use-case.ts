import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { RequestLoanCommand } from './request-loan.command';
import { type LoanRepository } from '../../core/contracts/LoanRepository';
import { type HistoryRepository } from '../../core/contracts/HistoryRepository';
import { Loan, LoanStatus } from '../../core/entities/Loan';
import { HistoryEntry, HistoryAction, HistoryTargetType } from '../../core/entities/HistoryEntry';
import { LoanableType } from '../../core/entities/LoanableType';
import { type IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';

export class RequestLoanUseCase implements IUseCase<RequestLoanCommand, void> {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly uuidService: IUuidService,
  ) {}

  async execute(command: RequestLoanCommand): Promise<void> {
    const loan = new Loan({
      id: command.id,
      requesterId: command.requesterId,
      targetId: command.targetId,
      targetType: command.targetType,
      requestDate: new Date(),
      status: LoanStatus.REQUESTED,
      notes: command.notes,
    });

    await this.loanRepository.save(loan);

    // Track history
    const history = new HistoryEntry({
      id: this.uuidService.generateUUID(),
      targetId: command.targetId,
      targetType: command.targetType === LoanableType.RECORD ? HistoryTargetType.RECORD : HistoryTargetType.DOCUMENT,
      action: HistoryAction.LENT, // LENT in the sense of initiating the loan process
      userId: command.requesterId,
      date: new Date(),
      details: `Loan requested for ${command.targetType}: ${command.targetId}`,
    });

    await this.historyRepository.save(history);
  }
}
