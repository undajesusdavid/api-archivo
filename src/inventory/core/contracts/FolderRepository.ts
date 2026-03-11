import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { Folder } from '../entities/Folder';

export const FOLDER_REPOSITORY = Symbol('FolderRepository');

export interface FolderRepository extends IBaseRepository<Folder, string> {
  findByCode(code: string): Promise<Folder | null>;
  findByBoxId(boxId: string): Promise<Folder[]>;
}
