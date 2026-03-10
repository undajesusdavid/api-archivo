// src/shared/infrastructure/persistence/typeorm/typeorm-unit-of-work.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IUnitOfWork } from 'src/shared/core/interfaces/unit-of-work.interface';
import { transactionStorage } from './typeorm.transaction-context'; // Importamos el storage

@Injectable()
export class TypeOrmUnitOfWork implements IUnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // El método .run() hace que el manager esté disponible en el 'store'
    // para cualquier código que se ejecute dentro de 'work()'
    try {
      const result = await transactionStorage.run(
        queryRunner.manager,
        async () => {
          return await work();
        },
      );

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
