import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HistoryAction, HistoryTargetType } from '../../../core/entities/HistoryEntry';
import { UserOrmEntity } from '../../../../users/infrastructure/persistence/typeorm/user.model';

@Entity('history_logs')
export class TypeOrmHistoryModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'target_id' })
  targetId: string;

  @Column({
    type: 'enum',
    enum: HistoryTargetType,
    name: 'target_type',
  })
  targetType: HistoryTargetType;

  @Column({
    type: 'enum',
    enum: HistoryAction,
  })
  action: HistoryAction;

  @Column({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'date' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  details?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;
}
