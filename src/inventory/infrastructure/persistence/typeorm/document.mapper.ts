import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Document } from '../../../core/entities/Document';
import { TypeOrmDocumentModel } from './document.model';

export class TypeOrmDocumentMapper extends BaseMapper<Document, TypeOrmDocumentModel> {
  toDomain(model: TypeOrmDocumentModel): Document {
    return new Document({
      id: model.id,
      recordId: model.recordId,
      code: model.code,
      creationDate: model.creationDate,
      metadata: model.metadata || {},
      status: model.status,
      conservationStatus: model.conservationStatus,
    });
  }

  toPersistence(entity: Document): TypeOrmDocumentModel {
    const model = new TypeOrmDocumentModel();
    model.id = entity.getId();
    model.recordId = entity.getRecordId();
    model.code = entity.getCode();
    model.creationDate = entity.getCreationDate();
    model.metadata = entity.getMetadata();
    model.status = entity.getStatus();
    model.conservationStatus = entity.getConservationStatus();
    return model;
  }
}
