import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { GetInventoryQuery } from './get-inventory.query';
import { BOX_REPOSITORY, type BoxRepository } from '../../core/contracts/BoxRepository';
import { FOLDER_REPOSITORY, type FolderRepository } from '../../core/contracts/FolderRepository';
import { RECORD_REPOSITORY, type RecordRepository } from '../../core/contracts/RecordRepository';
import { DOCUMENT_REPOSITORY, type DocumentRepository } from '../../core/contracts/DocumentRepository';

@Injectable()
export class GetInventoryUseCase implements IUseCase<GetInventoryQuery, any[]> {
  constructor(
    @Inject(BOX_REPOSITORY)
    private readonly boxRepository: BoxRepository,
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: FolderRepository,
    @Inject(RECORD_REPOSITORY)
    private readonly recordRepository: RecordRepository,
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}

  async execute(query: GetInventoryQuery): Promise<any[]> {
    switch (query.type) {
      case 'box':
        return this.boxRepository.findAll();
      case 'folder':
        return this.folderRepository.findAll();
      case 'record':
        return this.recordRepository.findAll();
      case 'document':
        return this.documentRepository.findAll();
      default:
        throw new Error(`Invalid inventory type: ${query.type}`);
    }
  }
}
