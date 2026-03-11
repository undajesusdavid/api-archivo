import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { Loan } from '../../../core/entities/Loan';
import { TypeOrmLoanModel } from './loan.model';
import { TypeOrmLoanMapper } from './loan.mapper';
import { LoanRepository } from '../../../core/contracts/LoanRepository';

@Injectable()
export class TypeOrmLoanRepository
  extends BaseTypeOrmRepository<Loan, TypeOrmLoanModel, string>
  implements LoanRepository
{
  constructor(
    @InjectRepository(TypeOrmLoanModel)
    repository: Repository<TypeOrmLoanModel>,
    mapper: TypeOrmLoanMapper,
  ) {
    super(repository, mapper);
  }

  async findByRequesterId(userId: string): Promise<Loan[]> {
    const models = await this.entityRepository.find({ where: { requesterId: userId } as any });
    return this.mapper.toDomainList(models);
  }

  async findByTargetId(targetId: string): Promise<Loan[]> {
    const models = await this.entityRepository.find({ where: { targetId } as any });
    return this.mapper.toDomainList(models);
  }
}
