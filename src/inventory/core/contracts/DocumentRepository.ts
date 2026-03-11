import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { Document } from '../entities/Document';

export const DOCUMENT_REPOSITORY = Symbol('DocumentRepository');

export interface DocumentRepository extends IBaseRepository<Document, string> {
  findByCode(code: string): Promise<Document | null>;
  findByRecordId(recordId: string): Promise<Document[]>;
}
