import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
     const uri = configService.get<string>('URI');
     console.log('[TypeOrmConfig] URI found:', !!uri);
 
     return {
       type: 'postgres',
       url: uri,
       extra: {
         ssl: {
           rejectUnauthorized: false,
         },
       },
       ssl: {
         rejectUnauthorized: false,
       },
       autoLoadEntities: true,
       synchronize: configService.get<boolean>('DB_SYNC'),
       logging: true,
     };
   },
});
