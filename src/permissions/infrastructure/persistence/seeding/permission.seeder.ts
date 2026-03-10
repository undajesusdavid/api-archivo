import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'src/shared/infrastructure/persistence/seeding/seeder.interface';
import { PERMISSION_REPOSITORY } from 'src/permissions/core/contracts/PermissionRepository';
import type { PermissionRepository } from 'src/permissions/core/contracts/PermissionRepository';
import { PERMISSIONS } from 'src/permissions/core/seeds/Permission.seeds';
import { Permission } from 'src/permissions/core/entities/Permission';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async run(): Promise<void> {
    const permissions = Object.values(PERMISSIONS);
    let count = 1;

    for (const p of permissions) {
      const existing = await this.permissionRepository.findByName(p.name);
      if (!existing) {
        const permission = new Permission({
          id: count++,
          name: p.name,
          description: p.description,
          isActive: true,
        });
        await this.permissionRepository.save(permission);
      }
    }
  }
}
