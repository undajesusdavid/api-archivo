import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Box } from '../../../core/entities/Box';
import { TypeOrmBoxModel } from './box.model';

export class TypeOrmBoxMapper extends BaseMapper<Box, TypeOrmBoxModel> {
  toDomain(model: TypeOrmBoxModel): Box {
    return new Box({
      id: model.id,
      locationCode: model.locationCode,
      creationDate: model.creationDate,
      metadata: model.metadata || {},
      status: model.status,
      conservationStatus: model.conservationStatus,
    });
  }

  toPersistence(entity: Box): TypeOrmBoxModel {
    const model = new TypeOrmBoxModel();
    model.id = entity.getId();
    model.locationCode = entity.getLocationCode();
    model.creationDate = entity.getCreationDate();
    model.metadata = entity.getMetadata();
    model.status = entity.getStatus();
    model.conservationStatus = entity.getConservationStatus();
    return model;
  }
}
