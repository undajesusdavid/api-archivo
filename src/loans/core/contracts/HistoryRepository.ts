import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { HistoryEntry } from '../entities/HistoryEntry';

export const HISTORY_REPOSITORY = Symbol('HistoryRepository');

export interface HistoryRepository extends IBaseRepository<HistoryEntry, string> {
  findByTargetId(targetId: string): Promise<HistoryEntry[]>;
}
