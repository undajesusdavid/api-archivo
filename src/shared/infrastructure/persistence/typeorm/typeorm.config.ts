import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const host = configService.get<string>('DB_HOST') || 'localhost';
    const port = parseInt(configService.get<string>('DB_PORT') || '5432', 10);
    const user = configService.get<string>('DB_USER') || 'postgres';
    const password = configService.get<string>('DB_PASSWORD') || 'password';
    const database = configService.get<string>('DB_NAME') || 'cmp';
    const sslEnabled =
      (configService.get<string>('DB_SSL') ?? 'false') === 'true';
    const synchronize =
      (configService.get<string>('DB_SYNC') ?? 'true') === 'true';

    return {
      type: 'postgres',
      host: host,
      port: port,
      username: user,
      password: password,
      database: database,
      ssl: sslEnabled ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: synchronize,
      logging: true,
    };
  },
});
