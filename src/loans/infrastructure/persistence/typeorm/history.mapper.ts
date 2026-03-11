import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { HistoryEntry } from '../../../core/entities/HistoryEntry';
import { TypeOrmHistoryModel } from './history.model';

export class TypeOrmHistoryMapper extends BaseMapper<HistoryEntry, TypeOrmHistoryModel> {
  toDomain(model: TypeOrmHistoryModel): HistoryEntry {
    return new HistoryEntry({
      id: model.id,
      targetId: model.targetId,
      targetType: model.targetType,
      action: model.action,
      userId: model.userId,
      date: model.date,
      details: model.details,
    });
  }

  toPersistence(entity: HistoryEntry): TypeOrmHistoryModel {
    const model = new TypeOrmHistoryModel();
    model.id = entity.getId();
    model.targetId = entity.getTargetId();
    model.targetType = entity.getTargetType();
    model.action = entity.getAction();
    model.userId = entity.getUserId();
    model.date = entity.getDate();
    model.details = entity.getDetails();
    return model;
  }
}
