import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';
import { UserModule } from 'src/users/infrastructure/nestjs/context/user.module';
import { RolesModule } from 'src/roles/infrastructure/nestjs/context/roles.module';
import { PermissionModule } from 'src/permissions/infrastructure/nestjs/context/permission.module';
import { PermissionSeeder } from 'src/permissions/infrastructure/persistence/seeding/permission.seeder';
import { RoleSeeder } from 'src/roles/infrastructure/persistence/seeding/role.seeder';
import { UserSeeder } from 'src/users/infrastructure/persistence/seeding/user.seeder';
import { InventoryModule } from 'src/inventory/infrastructure/nestjs/context/inventory.module';
import { InventorySeeder } from 'src/inventory/infrastructure/persistence/seeding/inventory.seeder';
import { LoansModule } from 'src/loans/infrastructure/nestjs/context/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UserModule,
    RolesModule,
    PermissionModule,
    InventoryModule,
    LoansModule,
  ],
  providers: [PermissionSeeder, RoleSeeder, UserSeeder, InventorySeeder],
  exports: [PermissionSeeder, RoleSeeder, UserSeeder, InventorySeeder],
})
export class SeederModule {}
