import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Role } from '../../../core/entities/Role';
import { RoleModelAttributes } from './role.model';

export class SequelizeRoleMapper extends BaseMapper<Role, RoleModelAttributes> {
  toDomain(model: RoleModelAttributes): Role {
    const role = Role.restore({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: model.isActive,
    });

    return role;
  }

  toPersistence(entity: Role): RoleModelAttributes {
    const model = {
      id: entity.getId(),
      name: entity.getName(),
      description: entity.getDescription(),
      isActive: entity.getIsActive(),
    };
    return model;
  }
}
