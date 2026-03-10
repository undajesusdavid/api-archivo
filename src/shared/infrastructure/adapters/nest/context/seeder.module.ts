import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';
import { UserModule } from 'src/users/infrastructure/nestjs/context/user.module';
import { RolesModule } from 'src/roles/infrastructure/nestjs/context/roles.module';
import { PermissionModule } from 'src/permissions/infrastructure/nestjs/context/permission.module';
import { PermissionSeeder } from 'src/permissions/infrastructure/persistence/seeding/permission.seeder';
import { RoleSeeder } from 'src/roles/infrastructure/persistence/seeding/role.seeder';
import { UserSeeder } from 'src/users/infrastructure/persistence/seeding/user.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UserModule,
    RolesModule,
    PermissionModule,
  ],
  providers: [PermissionSeeder, RoleSeeder, UserSeeder],
  exports: [PermissionSeeder, RoleSeeder, UserSeeder],
})
export class SeederModule {}
