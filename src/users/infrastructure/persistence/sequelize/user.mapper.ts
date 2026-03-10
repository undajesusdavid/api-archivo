import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { User } from 'src/users/core/entities/User';
import { UserModelAttributes } from './user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SequelizeUserMapper extends BaseMapper<User, UserModelAttributes> {
  toDomain(model: UserModelAttributes): User {
    const roles = model.roles ? model.roles.map((r) => r.name) : [];
    const permissions = model.roles
      ? model.roles.flatMap((r) => r.permissions.map((perm) => perm.name))
      : [];

    const user = new User({
      id: model.id,
      username: model.username,
      password: model.password,
      email: model.email,
      active: model.active,
      roles: roles,
      permissions: permissions,
    });
    return user;
  }

  toPersistence(entity: User): UserModelAttributes {
    const model = {
      id: entity.getId(),
      username: entity.getUsername(),
      password: entity.getPassword(),
      email: entity.getEmail(),
      active: entity.isActive(),
    };
    return model;
  }
}
