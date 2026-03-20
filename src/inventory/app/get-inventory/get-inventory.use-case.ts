import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { GetInventoryQuery } from './get-inventory.query';
import { type BoxRepository } from '../../core/contracts/BoxRepository';
import { type FolderRepository } from '../../core/contracts/FolderRepository';
import { type RecordRepository } from '../../core/contracts/RecordRepository';
import { type DocumentRepository } from '../../core/contracts/DocumentRepository';

export class GetInventoryUseCase implements IUseCase<GetInventoryQuery, any[]> {
  constructor(
    private readonly boxRepository: BoxRepository,
    private readonly folderRepository: FolderRepository,
    private readonly recordRepository: RecordRepository,
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
