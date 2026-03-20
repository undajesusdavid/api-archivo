import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { InventoryStatus } from '../../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../../core/value-objects/ConservationStatus';
import { TypeOrmFolderModel } from './folder.model';
import { TypeOrmDocumentModel } from './document.model';

@Entity('inv_records')
export class TypeOrmRecordModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'folder_id' })
  folderId: string;

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

  @ManyToOne(() => TypeOrmFolderModel, (folder) => folder.records)
  @JoinColumn({ name: 'folder_id' })
  folder: TypeOrmFolderModel;

  @OneToMany(() => TypeOrmDocumentModel, (document) => document.record)
  documents: TypeOrmDocumentModel[];
}
