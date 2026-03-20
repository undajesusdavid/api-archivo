import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { ApproveLoanCommand } from './approve-loan.command';
import { type LoanRepository } from '../../core/contracts/LoanRepository';
import { type HistoryRepository } from '../../core/contracts/HistoryRepository';
import { HistoryEntry, HistoryAction, HistoryTargetType } from '../../core/entities/HistoryEntry';
import { LoanableType } from '../../core/entities/LoanableType';
import { type IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';
import { type RecordRepository } from '../../../inventory/core/contracts/RecordRepository';
import { type DocumentRepository } from '../../../inventory/core/contracts/DocumentRepository';
import { InventoryStatus } from '../../../inventory/core/value-objects/InventoryStatus';

export class ApproveLoanUseCase implements IUseCase<ApproveLoanCommand, void> {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly uuidService: IUuidService,
    private readonly recordRepository: RecordRepository,
    private readonly documentRepository: DocumentRepository,
  ) {}

  async execute(command: ApproveLoanCommand): Promise<void> {
    const loan = await this.loanRepository.findById(command.loanId);
    if (!loan) {
      throw new Error(`Loan request not found: ${command.loanId}`);
    }

    loan.approve(command.dueDate);

    await this.loanRepository.save(loan);

    // Track history
    const history = new HistoryEntry({
      id: this.uuidService.generateUUID(),
      targetId: loan.getTargetId(),
      targetType: loan.getTargetType() === LoanableType.RECORD ? HistoryTargetType.RECORD : HistoryTargetType.DOCUMENT,
      action: HistoryAction.LENT,
      userId: command.archivistId,
      date: new Date(),
      details: `Loan approved for ${loan.getTargetType()}: ${loan.getTargetId()}. Due date: ${command.dueDate}`,
    });

    await this.historyRepository.save(history);

    // Update document/record status to LENT in inventory module
    if (loan.getTargetType() === LoanableType.RECORD) {
      const record = await this.recordRepository.findById(loan.getTargetId());
      if (record) {
        record.updateStatus(InventoryStatus.LENT);
        await this.recordRepository.save(record);
      }
    } else {
      const document = await this.documentRepository.findById(loan.getTargetId());
      if (document) {
        document.updateStatus(InventoryStatus.LENT);
        await this.documentRepository.save(document);
      }
    }
  }
}
