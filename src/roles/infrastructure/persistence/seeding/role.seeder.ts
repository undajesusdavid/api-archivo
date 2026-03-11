import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'src/shared/infrastructure/persistence/seeding/seeder.interface';
import { ROLE_REPOSITORY } from 'src/roles/core/contracts/RoleRepository';
import type { RoleRepository } from 'src/roles/core/contracts/RoleRepository';
import { ROLES } from 'src/roles/core/seeds/roles.seeds';
import { Role } from 'src/roles/core/entities/Role';
import { PERMISSION_REPOSITORY } from 'src/permissions/core/contracts/PermissionRepository';
import type { PermissionRepository } from 'src/permissions/core/contracts/PermissionRepository';
import { UUID_SERVICE } from 'src/shared/core/interfaces/uuid-service.interface';
import type { IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
    @Inject(UUID_SERVICE)
    private readonly uuidService: IUuidService,
  ) {}

  async run(): Promise<void> {
    const roles = Object.values(ROLES);

    for (const r of roles) {
      const existing = await this.roleRepository.findByName(r.name);
      if (!existing) {
        const role = Role.create({
          id: this.uuidService.generateUUID(),
          name: r.name,
          description: r.description,
          isActive: r.isActive,
        });
        await this.roleRepository.save(role);

        // Si es el rol root, le asignamos todos los permisos disponibles
        if (r.name === 'root') {
          const allPermissions = await this.permissionRepository.findAll();
          const permissionIds = allPermissions.map((p) => p.getId());
          await this.roleRepository.assignPermissions(
            role.getId(),
            permissionIds,
          );
        }
      }
    }
  }
}
