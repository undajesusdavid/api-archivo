import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { type DocumentRepository } from '../../../inventory/core/contracts/DocumentRepository';
import { type LoanRepository } from '../../core/contracts/LoanRepository';
import { type PdfService } from '../../core/contracts/PdfService';
import { type RecordRepository } from '../../../inventory/core/contracts/RecordRepository';
import { type UserRepository } from '../../../users/core/contracts/UserRepository';
import { LoanableType } from '../../core/entities/LoanableType';

export class GenerateLoanReportCommand {
  constructor(public readonly loanId: string) {}
}

export class GenerateLoanReportUseCase implements IUseCase<GenerateLoanReportCommand, Buffer> {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly userRepository: UserRepository,
    private readonly pdfService: PdfService,
    private readonly recordRepository: RecordRepository,
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
