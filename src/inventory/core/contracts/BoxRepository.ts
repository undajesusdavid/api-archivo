import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { Box } from '../entities/Box';

export const BOX_REPOSITORY = Symbol('BoxRepository');

export interface BoxRepository extends IBaseRepository<Box, string> {
  findByLocationCode(code: string): Promise<Box | null>;
}
