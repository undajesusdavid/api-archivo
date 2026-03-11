import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { InventoryStatus } from '../../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../../core/value-objects/ConservationStatus';
import { TypeOrmFolderModel } from './folder.model';

@Entity('boxes')
export class TypeOrmBoxModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'location_code' })
  locationCode: string;

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

  @OneToMany(() => TypeOrmFolderModel, (folder) => folder.box)
  folders: TypeOrmFolderModel[];
}
