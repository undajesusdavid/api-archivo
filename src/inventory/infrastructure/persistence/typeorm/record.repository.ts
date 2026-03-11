import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { RecordEntity } from '../../../core/entities/Record';
import { TypeOrmRecordModel } from './record.model';
import { TypeOrmRecordMapper } from './record.mapper';
import { RecordRepository } from '../../../core/contracts/RecordRepository';

@Injectable()
export class TypeOrmRecordRepository
  extends BaseTypeOrmRepository<RecordEntity, TypeOrmRecordModel, string>
  implements RecordRepository
{
  constructor(
    @InjectRepository(TypeOrmRecordModel)
    repository: Repository<TypeOrmRecordModel>,
    mapper: TypeOrmRecordMapper,
  ) {
    super(repository, mapper);
  }

  async findByCode(code: string): Promise<RecordEntity | null> {
    const model = await this.entityRepository.findOne({ where: { code } as any });
    return model ? this.mapper.toDomain(model) : null;
  }

  async findByFolderId(folderId: string): Promise<RecordEntity[]> {
    const models = await this.entityRepository.find({ where: { folderId } as any });
    return this.mapper.toDomainList(models);
  }
}
