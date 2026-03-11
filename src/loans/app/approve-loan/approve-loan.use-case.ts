import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { ApproveLoanCommand } from './approve-loan.command';
import { LOAN_REPOSITORY, type LoanRepository } from '../../core/contracts/LoanRepository';
import { HISTORY_REPOSITORY, type HistoryRepository } from '../../core/contracts/HistoryRepository';
import { HistoryEntry, HistoryAction, HistoryTargetType } from '../../core/entities/HistoryEntry';
import { LoanableType } from '../../core/entities/LoanableType';
import { type IUuidService, UUID_SERVICE } from 'src/shared/core/interfaces/uuid-service.interface';
import { RECORD_REPOSITORY, type RecordRepository } from '../../../inventory/core/contracts/RecordRepository';
import { DOCUMENT_REPOSITORY, type DocumentRepository } from '../../../inventory/core/contracts/DocumentRepository';
import { InventoryStatus } from '../../../inventory/core/value-objects/InventoryStatus';

@Injectable()
export class ApproveLoanUseCase implements IUseCase<ApproveLoanCommand, void> {
  constructor(
    @Inject(LOAN_REPOSITORY)
    private readonly loanRepository: LoanRepository,
    @Inject(HISTORY_REPOSITORY)
    private readonly historyRepository: HistoryRepository,
    @Inject(UUID_SERVICE)
    private readonly uuidService: IUuidService,
    @Inject(RECORD_REPOSITORY)
    private readonly recordRepository: RecordRepository,
    @Inject(DOCUMENT_REPOSITORY)
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
