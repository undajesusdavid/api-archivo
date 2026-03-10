import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Permission } from 'src/permissions/core/entities/Permission';
import { TypeormPermissionModel } from '../../../../permissions/infrastructure/persistence/typeorm/permission.model';

export class TypeormPermissionMapper extends BaseMapper<
  Permission,
  TypeormPermissionModel
> {
  toDomain(model: TypeormPermissionModel): Permission {
    return new Permission({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: model.isActive,
    });
  }

  toPersistence(entity: Permission): TypeormPermissionModel {
    const model = new TypeormPermissionModel();
    model.id = entity.getId();
    model.name = entity.getName();
    model.description = entity.getDescription();
    model.isActive = entity.getIsActive();

    return model;
  }
}
