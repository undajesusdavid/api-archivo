import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoanStatus } from '../../../core/entities/Loan';
import { LoanableType } from '../../../core/entities/LoanableType';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/typeorm/user.model';

@Entity('loans')
export class TypeOrmLoanModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'requester_id' })
  requesterId: string;

  @Column({ name: 'target_id' })
  targetId: string;

  @Column({
    type: 'enum',
    enum: LoanableType,
    name: 'target_type',
  })
  targetType: LoanableType;

  @CreateDateColumn({ name: 'request_date' })
  requestDate: Date;

  @Column({ name: 'loan_date', nullable: true })
  loanDate?: Date;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;

  @Column({ name: 'return_date', nullable: true })
  returnDate?: Date;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.REQUESTED,
  })
  status: LoanStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'requester_id' })
  requester: UserOrmEntity;
}
