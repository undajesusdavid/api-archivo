export abstract class BaseMapper<Domain, Persistence> {
  abstract toDomain(persistence: Persistence): Domain;
  abstract toPersistence(entity: Domain): Persistence;

  public toDomainList(persistences: Persistence[]): Domain[] {
    return persistences.map((persistence) => this.toDomain(persistence));
  }
  public toPersistenceList(entities: Domain[]): Persistence[] {
    return entities.map((entity) => this.toPersistence(entity));
  }
}
