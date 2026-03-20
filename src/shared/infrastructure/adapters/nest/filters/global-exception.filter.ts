import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from 'src/shared/core/errors/app-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof AppError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      code = exception.code;
    } else if (exception.name === 'QueryFailedError') {
      const driverError = exception.driverError;
      if (driverError && driverError.code === '23505') {
        status = HttpStatus.CONFLICT;
        message = 'Conflicto de duplicidad en la base de datos';
        code = 'DB_UNIQUE_CONSTRAINT';
      } else if (driverError && driverError.code === '23503') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Error de relación: Referencia no encontrada';
        code = 'DB_FOREIGN_KEY_ERROR';
      }
    } else if (typeof exception.getStatus === 'function') {
      status = exception.getStatus();
      const res = exception.getResponse() as any;

      // Si res.message existe (que vendrá del ValidationPipe), lo usamos.
      // De lo contrario, usamos el mensaje por defecto.
      message = res.message || res;
      code = res.error || 'VALIDATION_ERROR';
    }

    // Respuesta final
    response.status(status).json({
      success: false,
      error: {
        code,
        message, // <--- Ahora sí será el array de validaciones
        timestamp: new Date().toISOString(),
      },
    });
  }
}
