import { Injectable, Inject, Logger } from '@nestjs/common';
import { Seeder } from 'src/shared/infrastructure/persistence/seeding/seeder.interface';
import { BOX_REPOSITORY, type BoxRepository } from '../../../core/contracts/BoxRepository';
import { FOLDER_REPOSITORY, type FolderRepository } from '../../../core/contracts/FolderRepository';
import { RECORD_REPOSITORY, type RecordRepository } from '../../../core/contracts/RecordRepository';
import { DOCUMENT_REPOSITORY, type DocumentRepository } from '../../../core/contracts/DocumentRepository';
import { Box } from '../../../core/entities/Box';
import { Folder } from '../../../core/entities/Folder';
import { RecordEntity } from '../../../core/entities/Record';
import { Document } from '../../../core/entities/Document';
import { InventoryStatus } from '../../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../../core/value-objects/ConservationStatus';

@Injectable()
export class InventorySeeder implements Seeder {
  private readonly logger = new Logger(InventorySeeder.name);

  constructor(
    @Inject(BOX_REPOSITORY) private readonly boxRepository: BoxRepository,
    @Inject(FOLDER_REPOSITORY) private readonly folderRepository: FolderRepository,
    @Inject(RECORD_REPOSITORY) private readonly recordRepository: RecordRepository,
    @Inject(DOCUMENT_REPOSITORY) private readonly documentRepository: DocumentRepository,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Seeding Inventory...');

    const boxId = '00000000-0000-7000-8000-000000000001';
    const folderId = '00000000-0000-7000-8000-000000000002';
    const recordId = '00000000-0000-7000-8000-000000000003';
    const docId = '00000000-0000-7000-8000-000000000004';

    const box = new Box({
      id: boxId,
      locationCode: 'EST-01-MOD-A',
      creationDate: new Date(),
      metadata: { label: 'Box 1' },
      status: InventoryStatus.IN_SHELF,
      conservationStatus: ConservationStatus.GOOD,
    });

    const folder = new Folder({
      id: folderId,
      boxId: boxId,
      code: 'F-001',
      creationDate: new Date(),
      metadata: { label: 'Folder 1' },
      status: InventoryStatus.IN_SHELF,
      conservationStatus: ConservationStatus.GOOD,
    });

    const record = new RecordEntity({
      id: recordId,
      folderId: folderId,
      code: 'R-001',
      creationDate: new Date(),
      metadata: { label: 'Record 1' },
      status: InventoryStatus.IN_SHELF,
      conservationStatus: ConservationStatus.GOOD,
    });

    const document = new Document({
      id: docId,
      recordId: recordId,
      code: 'D-001',
      creationDate: new Date(),
      metadata: { label: 'Document 1' },
      status: InventoryStatus.IN_SHELF,
      conservationStatus: ConservationStatus.GOOD,
    });

    await this.boxRepository.save(box);
    await this.folderRepository.save(folder);
    await this.recordRepository.save(record);
    await this.documentRepository.save(document);

    this.logger.log('Inventory seeded successfully.');
  }
}
