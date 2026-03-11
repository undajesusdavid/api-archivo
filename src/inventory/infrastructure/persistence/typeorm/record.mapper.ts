import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { RecordEntity } from '../../../core/entities/Record';
import { TypeOrmRecordModel } from './record.model';

export class TypeOrmRecordMapper extends BaseMapper<RecordEntity, TypeOrmRecordModel> {
  toDomain(model: TypeOrmRecordModel): RecordEntity {
    return new RecordEntity({
      id: model.id,
      folderId: model.folderId,
      code: model.code,
      creationDate: model.creationDate,
      metadata: model.metadata || {},
      status: model.status,
      conservationStatus: model.conservationStatus,
    });
  }

  toPersistence(entity: RecordEntity): TypeOrmRecordModel {
    const model = new TypeOrmRecordModel();
    model.id = entity.getId();
    model.folderId = entity.getFolderId();
    model.code = entity.getCode();
    model.creationDate = entity.getCreationDate();
    model.metadata = entity.getMetadata();
    model.status = entity.getStatus();
    model.conservationStatus = entity.getConservationStatus();
    return model;
  }
}
