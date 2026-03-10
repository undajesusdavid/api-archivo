import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import validator from 'validator';

@Injectable()
export class UserIdPipe implements PipeTransform {
  transform(value: any) {
    // Validar que sea string
    if (typeof value !== 'string') {
      throw new BadRequestException('El id debe ser una cadena');
    }

    // Validar que sea UUID v7
    if (!validator.isUUID(value, 7)) {
      throw new BadRequestException('El id debe ser un UUID válido');
    }

    // Validar longitud mínima (ejemplo adicional)
    if (value.length < 10) {
      throw new BadRequestException('El id es demasiado corto');
    }

    // Si pasa todas las validaciones, lo retornas
    return value;
  }
}
