// src/shared/infrastructure/filters/global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from 'src/shared/core/errors/app-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // --- LOG PARA DEBUG (Míralo en tu terminal de VS Code/Terminal) ---
    console.log('TIPO DE EXCEPCION:', exception.constructor.name);
    console.log('RESPUESTA INTERNA:', exception.getResponse ? exception.getResponse() : 'No tiene getResponse');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';
    let code = 'INTERNAL_SERVER_ERROR';

    // PRIORIDAD 1: EXCEPCIONES DE NESTJS (Aquí caen las validaciones 422)
    if (exception.getStatus && typeof exception.getStatus === 'function') {
      status = exception.getStatus();
      const res = exception.getResponse() as any;

      if (typeof res === 'object' && res !== null) {
        // ValidationPipe guarda los strings en .message
        message = res.message || exception.message;
        code = res.error || 'HTTP_ERROR';
      } else {
        message = res || exception.message;
        code = 'HTTP_ERROR';
      }
    }
    // PRIORIDAD 2: TUS ERRORES DE DOMINIO
    else if (exception instanceof AppError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      code = exception.code;
    }
    // PRIORIDAD 3: ERRORES DE BASE DE DATOS
    else if (exception.name === 'QueryFailedError') {
      status = HttpStatus.CONFLICT;
      message = 'Error de base de datos';
      code = 'DB_ERROR';
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }
}