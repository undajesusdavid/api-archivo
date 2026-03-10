import { Permission } from '../entities/Permission';
import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';

export const PERMISSION_REPOSITORY = Symbol('PermissionRepository');

export interface PermissionRepository
  extends IBaseRepository<Permission, number> {
  findByName(name: string): Promise<Permission | null>;
  changePermissionStatus(id: string, status: boolean): Promise<boolean>;
  findExistingIds(ids: number[]): Promise<number[]>;
}
