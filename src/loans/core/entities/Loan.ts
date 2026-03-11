import { LoanableType } from './LoanableType';

export enum LoanStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE',
}

export interface LoanProps {
  id: string;
  requesterId: string;
  targetId: string;
  targetType: LoanableType;
  requestDate: Date;
  loanDate?: Date;
  dueDate?: Date;
  returnDate?: Date;
  status: LoanStatus;
  notes?: string;
}

export class Loan {
  private readonly id: string;
  private readonly requesterId: string;
  private readonly targetId: string;
  private readonly targetType: LoanableType;
  private readonly requestDate: Date;
  private loanDate?: Date;
  private dueDate?: Date;
  private returnDate?: Date;
  private status: LoanStatus;
  private notes?: string;

  constructor(props: LoanProps) {
    this.id = props.id;
    this.requesterId = props.requesterId;
    this.targetId = props.targetId;
    this.targetType = props.targetType;
    this.requestDate = props.requestDate;
    this.loanDate = props.loanDate;
    this.dueDate = props.dueDate;
    this.returnDate = props.returnDate;
    this.status = props.status;
    this.notes = props.notes;
  }

  getId(): string { return this.id; }
  getRequesterId(): string { return this.requesterId; }
  getTargetId(): string { return this.targetId; }
  getTargetType(): LoanableType { return this.targetType; }
  getRequestDate(): Date { return this.requestDate; }
  getLoanDate(): Date | undefined { return this.loanDate; }
  getDueDate(): Date | undefined { return this.dueDate; }
  getReturnDate(): Date | undefined { return this.returnDate; }
  getStatus(): LoanStatus { return this.status; }
  getNotes(): string | undefined { return this.notes; }

  approve(dueDate: Date): void {
    this.status = LoanStatus.APPROVED;
    this.loanDate = new Date();
    this.dueDate = dueDate;
  }

  reject(notes: string): void {
    this.status = LoanStatus.REJECTED;
    this.notes = notes;
  }

  return(): void {
    this.status = LoanStatus.RETURNED;
    this.returnDate = new Date();
  }
}
