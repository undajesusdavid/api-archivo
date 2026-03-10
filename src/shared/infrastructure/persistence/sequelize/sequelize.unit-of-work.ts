import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { transactionStorage } from 'src/shared/infrastructure/persistence/sequelize/sequelize.transaction-context';
import { IUnitOfWork } from 'src/shared/core/interfaces/unit-of-work.interface';

@Injectable()
export class SequelizeUnitOfWork implements IUnitOfWork {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return this.sequelize.transaction(async (t) => {
      return await transactionStorage.run(t, async () => {
        return await work();
      });
    });
  }
}
