import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeederModule } from './shared/infrastructure/adapters/nest/context/seeder.module';
import { SeederRunner } from './shared/infrastructure/persistence/seeding/seeder.runner';
import { PermissionSeeder } from './permissions/infrastructure/persistence/seeding/permission.seeder';
import { RoleSeeder } from './roles/infrastructure/persistence/seeding/role.seeder';
import { UserSeeder } from './users/infrastructure/persistence/seeding/user.seeder';
import { InventorySeeder } from './inventory/infrastructure/persistence/seeding/inventory.seeder';

async function bootstrap() {
  const logger = new Logger('SeederBootstrap');

  try {
    const appContext = await NestFactory.createApplicationContext(SeederModule);

    const permissionSeeder = appContext.get(PermissionSeeder);
    const roleSeeder = appContext.get(RoleSeeder);
    const userSeeder = appContext.get(UserSeeder);
    const inventorySeeder = appContext.get(InventorySeeder);

    const runner = new SeederRunner([permissionSeeder, roleSeeder, userSeeder, inventorySeeder]);

    await runner.run();

    await appContext.close();
    logger.log('✅ Seeding finalizado correctamente.');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error durante el proceso de seeding:', error);
    process.exit(1);
  }
}

bootstrap();
