import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Folder } from '../../../core/entities/Folder';
import { TypeOrmFolderModel } from './folder.model';

export class TypeOrmFolderMapper extends BaseMapper<Folder, TypeOrmFolderModel> {
  toDomain(model: TypeOrmFolderModel): Folder {
    return new Folder({
      id: model.id,
      boxId: model.boxId,
      code: model.code,
      creationDate: model.creationDate,
      metadata: model.metadata || {},
      status: model.status,
      conservationStatus: model.conservationStatus,
    });
  }

  toPersistence(entity: Folder): TypeOrmFolderModel {
    const model = new TypeOrmFolderModel();
    model.id = entity.getId();
    model.boxId = entity.getBoxId();
    model.code = entity.getCode();
    model.creationDate = entity.getCreationDate();
    model.metadata = entity.getMetadata();
    model.status = entity.getStatus();
    model.conservationStatus = entity.getConservationStatus();
    return model;
  }
}
