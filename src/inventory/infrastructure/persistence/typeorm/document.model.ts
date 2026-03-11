import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InventoryStatus } from '../../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../../core/value-objects/ConservationStatus';
import { TypeOrmRecordModel } from './record.model';

@Entity('documents')
export class TypeOrmDocumentModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'record_id' })
  recordId: string;

  @Column({ unique: true })
  code: string;

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: InventoryStatus,
    default: InventoryStatus.IN_SHELF,
  })
  status: InventoryStatus;

  @Column({
    type: 'enum',
    enum: ConservationStatus,
    name: 'conservation_status',
    default: ConservationStatus.GOOD,
  })
  conservationStatus: ConservationStatus;

  @ManyToOne(() => TypeOrmRecordModel, (record) => record.documents)
  @JoinColumn({ name: 'record_id' })
  record: TypeOrmRecordModel;
}
