import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './context/app.module';
import { GlobalExceptionFilter } from 'src/shared/infrastructure/adapters/nest/filters/global-exception.filter';

export async function BootNest() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      errorHttpStatusCode: 422,
      exceptionFactory: (validationErrors) => {
        // Reducimos el array de errores a un solo objeto de mapeo
        const errorsObject = validationErrors.reduce((acc, error) => {
          const constraints = Object.values(error.constraints || {});
          // Tomamos el primer mensaje de error para ese campo
          acc[error.property] = constraints.length > 0 ? constraints[0] : 'Dato inválido';
          return acc;
        }, {});

        // Retornamos el formato solicitado: un array con el objeto de errores
        return new UnprocessableEntityException([errorsObject]);
      },
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(
    `🚀 Boilerplate API is running on: http://localhost:${port}/api/v1`,
  );
}
