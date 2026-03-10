// src/shared/core/interfaces/irepository.shared.ts
export interface IBaseRepository<T, ID = string | number> {
  // Consultas
  findAll(): Promise<T[]>;
  findAllPaginated(
    limit: number,
    offset: number,
  ): Promise<{ rows: T[]; count: number }>;
  findById(id: ID): Promise<T | null>;
  checkIdsExistence(
    ids: ID[],
  ): Promise<{ existingIds: ID[]; missingIds: ID[] }>;
  count(): Promise<number>;

  // Validadiones
  exists(id: ID): Promise<boolean>;
  existsAll(ids: ID[]): Promise<boolean>;

  // Comandos
  save(entity: T): Promise<void>;
  saveMany(entities: T[]): Promise<void>;
  update(id: ID, entity: Partial<T>): Promise<void>;
  delete(id: ID): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
}
