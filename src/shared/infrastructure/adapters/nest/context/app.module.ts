import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';
import { UserModule } from 'src/users/infrastructure/nestjs/context/user.module';
import { RolesModule } from 'src/roles/infrastructure/nestjs/context/roles.module';
import { PermissionModule } from 'src/permissions/infrastructure/nestjs/context/permission.module';
import { InventoryModule } from 'src/inventory/infrastructure/nestjs/context/inventory.module';
import { LoansModule } from 'src/loans/infrastructure/nestjs/context/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    UserModule,
    RolesModule,
    PermissionModule,
    InventoryModule,
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
