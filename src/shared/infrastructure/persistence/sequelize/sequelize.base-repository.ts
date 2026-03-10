import { Model, ModelStatic } from 'sequelize-typescript';
import { Op, Transaction } from 'sequelize';
import { IBaseRepository } from 'src/shared/core/interfaces/base-repository.interface';
import { transactionStorage } from './sequelize.transaction-context';
import { BaseMapper } from '../../base/mapper/base.mapper';

export abstract class BaseSequelizeRepository<
  TDomain,
  TAttributes,
  TModel extends Model,
  ID = string | number,
> implements IBaseRepository<TDomain, ID>
{
  constructor(
    protected readonly model: ModelStatic<TModel>,
    protected readonly mapper: BaseMapper<TDomain, TAttributes>,
  ) {}

  protected get modelEntity(): any {
    return this.model;
  }

  protected get currentTransaction(): Transaction | undefined {
    return transactionStorage.getStore() as Transaction | undefined;
  }

  // CONSULTAS

  async findAll(): Promise<TDomain[]> {
    const records = await this.modelEntity.findAll({
      transaction: this.currentTransaction,
    });
    return this.mapper.toDomainList(
      records.map((record) => record.get({ plain: true })),
    );
  }

  async findAllPaginated(
    limit: number,
    offset: number,
  ): Promise<{ rows: TDomain[]; count: number }> {
    throw new Error('Method not implemented.');
  }

  async findById(id: ID): Promise<TDomain | null> {
    const record = await this.modelEntity.findByPk(id, {
      transaction: this.currentTransaction,
    });
    return record ? this.mapper.toDomain(record.get({ plain: true })) : null;
  }

  async checkIdsExistence(
    ids: ID[],
  ): Promise<{ existingIds: ID[]; missingIds: ID[] }> {
    const records = await this.modelEntity.findAll({
      where: {
        id: { [Op.in]: ids },
      },
      attributes: ['id'],
      raw: true,
      transaction: this.currentTransaction,
    });

    const existingIds = records.map((record: any) => record.id);
    const missingIds = ids.filter((id) => !existingIds.includes(id));

    return { existingIds, missingIds };
  }

  async count(): Promise<number> {
    return await this.modelEntity.count({
      transaction: this.currentTransaction,
    });
  }

  // VALIDACIONES

  async exists(id: ID): Promise<boolean> {
    const record = await this.modelEntity.findByPk(id, {
      transaction: this.currentTransaction,
    });
    return !!record;
  }

  async existsAll(ids: ID[]): Promise<boolean> {
    const records = await this.modelEntity.findAll({
      where: { id: ids },
      transaction: this.currentTransaction,
    });
    return records.length === ids.length;
  }

  // COMANDOS

  async save(entity: TDomain): Promise<void> {
    const raw = this.mapper.toPersistence(entity);
    await this.modelEntity.create(raw, {
      transaction: this.currentTransaction,
    });
  }

  saveMany(entities: TDomain[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(id: ID, entity: TDomain): Promise<void> {
    const record = await this.modelEntity.findByPk(id, {
      transaction: this.currentTransaction,
    });

    if (!record) {
      throw new Error('Entity not found.');
    }

    const updatedData = this.mapper.toPersistence(entity);
    await record.update(updatedData, {
      transaction: this.currentTransaction,
    });
  }

  async delete(id: ID): Promise<void> {
    const record = await this.modelEntity.findByPk(id, {
      transaction: this.currentTransaction,
    });

    if (!record) {
      throw new Error('Entity not found.');
    }

    await record.destroy({
      transaction: this.currentTransaction,
    });
  }

  deleteMany(ids: ID[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
