import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as cls from 'cls-hooked';
import { Sequelize } from 'sequelize-typescript';

export const SequelizeConfigService = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const namespace = cls.createNamespace('nestjs-sequelize-transaction');
    (Sequelize as any).useCLS(namespace);
    const uri = config.get<string>('URI');

    return {
      dialect: 'postgres',
      uri: uri,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      },
      autoLoadModels: true,
      synchronize: true,
      logging: (sql: string) => {
        const uppercaseSql = sql.toUpperCase();
        if (
          uppercaseSql.includes('BEGIN') ||
          uppercaseSql.includes('COMMIT') ||
          uppercaseSql.includes('ROLLBACK')
        ) {
          console.log(`[DB-TX] ${sql}`);
        }
      },
    };
  },
});
