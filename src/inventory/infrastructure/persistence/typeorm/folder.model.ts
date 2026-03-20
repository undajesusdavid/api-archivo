import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { InventoryStatus } from '../../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../../core/value-objects/ConservationStatus';
import { TypeOrmBoxModel } from './box.model';
import { TypeOrmRecordModel } from './record.model';

@Entity('inv_folders')
export class TypeOrmFolderModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'box_id' })
  boxId: string;

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

  @ManyToOne(() => TypeOrmBoxModel, (box) => box.folders)
  @JoinColumn({ name: 'box_id' })
  box: TypeOrmBoxModel;

  @OneToMany(() => TypeOrmRecordModel, (record) => record.folder)
  records: TypeOrmRecordModel[];
}
