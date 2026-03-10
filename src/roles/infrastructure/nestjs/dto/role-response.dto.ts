import { Role } from 'src/roles/core/entities/Role';

export class RoleResponseDto {
  id: string;
  name: string;
  description: string;
  permissions?: number[];

  constructor(role: Role) {
    this.id = role.getId();
    this.name = role.getName();
    this.description = role.getDescription();
    this.permissions = role.getPermissions();
  }
}
