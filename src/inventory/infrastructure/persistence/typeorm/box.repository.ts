import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { Box } from '../../../core/entities/Box';
import { TypeOrmBoxModel } from './box.model';
import { TypeOrmBoxMapper } from './box.mapper';
import { BoxRepository } from '../../../core/contracts/BoxRepository';

@Injectable()
export class TypeOrmBoxRepository
  extends BaseTypeOrmRepository<Box, TypeOrmBoxModel, string>
  implements BoxRepository
{
  constructor(
    @InjectRepository(TypeOrmBoxModel)
    repository: Repository<TypeOrmBoxModel>,
    mapper: TypeOrmBoxMapper,
  ) {
    super(repository, mapper);
  }

  async findByLocationCode(code: string): Promise<Box | null> {
    const model = await this.entityRepository.findOne({ where: { locationCode: code } as any });
    return model ? this.mapper.toDomain(model) : null;
  }
}
