import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { User } from 'src/users/core/entities/User';
import { UserOrmEntity } from './user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserMapper extends BaseMapper<User, UserOrmEntity> {
  toDomain(model: UserOrmEntity): User {
    const roles = model.roles ? model.roles.map((r) => r.name) : [];
    const permissions = model.roles
      ? model.roles.flatMap((r) => r.permissions?.map((perm) => perm.name) || [])
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

  toPersistence(entity: User): UserOrmEntity {
    const model = new UserOrmEntity();
    model.id = entity.getId();
    model.username = entity.getUsername();
    model.password = entity.getPassword();
    model.email = entity.getEmail();
    model.active = entity.isActive();
    return model;
  }
}
