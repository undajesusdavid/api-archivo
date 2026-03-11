import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { RecordEntity } from '../entities/Record';

export const RECORD_REPOSITORY = Symbol('RecordRepository');

export interface RecordRepository extends IBaseRepository<RecordEntity, string> {
  findByCode(code: string): Promise<RecordEntity | null>;
  findByFolderId(folderId: string): Promise<RecordEntity[]>;
}
