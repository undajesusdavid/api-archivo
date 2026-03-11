import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { DOCUMENT_REPOSITORY, type DocumentRepository } from '../../../inventory/core/contracts/DocumentRepository';
import { LOAN_REPOSITORY, type LoanRepository } from '../../core/contracts/LoanRepository';
import { PDF_SERVICE, type PdfService } from '../../core/contracts/PdfService';
import { RECORD_REPOSITORY, type RecordRepository } from '../../../inventory/core/contracts/RecordRepository';
import { USER_REPOSITORY, type UserRepository } from '../../../users/core/contracts/UserRepository';
import { LoanableType } from '../../core/entities/LoanableType';

export class GenerateLoanReportCommand {
  constructor(public readonly loanId: string) {}
}

@Injectable()
export class GenerateLoanReportUseCase implements IUseCase<GenerateLoanReportCommand, Buffer> {
  constructor(
    @Inject(LOAN_REPOSITORY)
    private readonly loanRepository: LoanRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PDF_SERVICE)
    private readonly pdfService: PdfService,
    @Inject(RECORD_REPOSITORY)
    private readonly recordRepository: RecordRepository,
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  async execute(command: GenerateLoanReportCommand): Promise<Buffer> {
    const loan = await this.loanRepository.findById(command.loanId);
    if (!loan) {
      throw new Error(`Loan request not found: ${command.loanId}`);
    }

    const requester = await this.userRepository.findById(loan.getRequesterId());
    if (!requester) {
      throw new Error(`Requester not found: ${loan.getRequesterId()}`);
    }

    let target: any;
    if (loan.getTargetType() === LoanableType.RECORD) {
      target = await this.recordRepository.findById(loan.getTargetId());
    } else {
      target = await this.documentRepository.findById(loan.getTargetId());
    }

    if (!target) {
      throw new Error(`Target ${loan.getTargetType()} not found: ${loan.getTargetId()}`);
    }

    return this.pdfService.generateLoanActa(loan, requester, target);
  }
}
