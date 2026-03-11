import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { Document } from '../../../core/entities/Document';
import { TypeOrmDocumentModel } from './document.model';
import { TypeOrmDocumentMapper } from './document.mapper';
import { DocumentRepository } from '../../../core/contracts/DocumentRepository';

@Injectable()
export class TypeOrmDocumentRepository
  extends BaseTypeOrmRepository<Document, TypeOrmDocumentModel, string>
  implements DocumentRepository
{
  constructor(
    @InjectRepository(TypeOrmDocumentModel)
    repository: Repository<TypeOrmDocumentModel>,
    mapper: TypeOrmDocumentMapper,
  ) {
    super(repository, mapper);
  }

  async findByCode(code: string): Promise<Document | null> {
    const model = await this.entityRepository.findOne({ where: { code } as any });
    return model ? this.mapper.toDomain(model) : null;
  }

  async findByRecordId(recordId: string): Promise<Document[]> {
    const models = await this.entityRepository.find({ where: { recordId } as any });
    return this.mapper.toDomainList(models);
  }
}
