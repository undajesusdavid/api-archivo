import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { HistoryEntry } from '../../../core/entities/HistoryEntry';
import { TypeOrmHistoryModel } from './history.model';
import { TypeOrmHistoryMapper } from './history.mapper';
import { HistoryRepository } from '../../../core/contracts/HistoryRepository';

@Injectable()
export class TypeOrmHistoryRepository
  extends BaseTypeOrmRepository<HistoryEntry, TypeOrmHistoryModel, string>
  implements HistoryRepository
{
  constructor(
    @InjectRepository(TypeOrmHistoryModel)
    repository: Repository<TypeOrmHistoryModel>,
    mapper: TypeOrmHistoryMapper,
  ) {
    super(repository, mapper);
  }

  async findByTargetId(targetId: string): Promise<HistoryEntry[]> {
    const models = await this.entityRepository.find({ where: { targetId } as any });
    return this.mapper.toDomainList(models);
  }
}
