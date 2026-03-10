import { Module } from '@nestjs/common';
import { RolesModule } from '../../../../roles/infrastructure/nestjs/context/roles.module';
import { UserModule } from '../../../../users/infrastructure/nestjs/context/user.module';
import { PermissionModule } from '../../../../permissions/infrastructure/nestjs/context/permission.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared.module';

// Modulo de la aplicacion Global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en todos los módulos
    }),
    SharedModule,
    UserModule,
    RolesModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
