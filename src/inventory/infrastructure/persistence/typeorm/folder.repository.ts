import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { Folder } from '../../../core/entities/Folder';
import { TypeOrmFolderModel } from './folder.model';
import { TypeOrmFolderMapper } from './folder.mapper';
import { FolderRepository } from '../../../core/contracts/FolderRepository';

@Injectable()
export class TypeOrmFolderRepository
  extends BaseTypeOrmRepository<Folder, TypeOrmFolderModel, string>
  implements FolderRepository
{
  constructor(
    @InjectRepository(TypeOrmFolderModel)
    repository: Repository<TypeOrmFolderModel>,
    mapper: TypeOrmFolderMapper,
  ) {
    super(repository, mapper);
  }

  async findByCode(code: string): Promise<Folder | null> {
    const model = await this.entityRepository.findOne({ where: { code } as any });
    return model ? this.mapper.toDomain(model) : null;
  }

  async findByBoxId(boxId: string): Promise<Folder[]> {
    const models = await this.entityRepository.find({ where: { boxId } as any });
    return this.mapper.toDomainList(models);
  }
}
