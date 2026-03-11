import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Role } from '../../../core/entities/Role';
import { TypeormRoleModel } from './role.model';

export class TypeOrmRoleMapper extends BaseMapper<Role, TypeormRoleModel> {
  toDomain(model: TypeormRoleModel): Role {
    const role = Role.restore({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: model.isActive,
    });

    if (model.permissions) {
      role.setPermissions(model.permissions.map((p) => p.id));
    }

    return role;
  }

  toPersistence(entity: Role): TypeormRoleModel {
    const model = new TypeormRoleModel();
    model.id = entity.getId();
    model.name = entity.getName();
    model.description = entity.getDescription();
    model.isActive = entity.getIsActive();
    // Permissions are usually handled in the repository during save/update
    return model;
  }
}
