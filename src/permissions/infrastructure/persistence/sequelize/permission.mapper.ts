import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Permission } from 'src/permissions/core/entities/Permission';
import { PermissionModelAttributes } from './permission.model';

export class SequelizePermissionMapper extends BaseMapper<
  Permission,
  PermissionModelAttributes
> {
  toDomain(model: PermissionModelAttributes): Permission {
    const entity = new Permission({
      id: model.id, // Asignar un valor predeterminado si id es undefined
      name: model.name,
      description: model.description,
      isActive: model.isActive,
    });
    return entity;
  }

  toPersistence(entity: Permission): PermissionModelAttributes {
    const model = {
      id: entity.getId(),
      name: entity.getName(),
      description: entity.getDescription(),
      isActive: entity.getIsActive(),
    };

    return model;
  }
}
