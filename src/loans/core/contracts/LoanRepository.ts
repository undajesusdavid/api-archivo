import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { Loan } from '../entities/Loan';

export const LOAN_REPOSITORY = Symbol('LoanRepository');

export interface LoanRepository extends IBaseRepository<Loan, string> {
  findByRequesterId(userId: string): Promise<Loan[]>;
  findByTargetId(targetId: string): Promise<Loan[]>;
}
