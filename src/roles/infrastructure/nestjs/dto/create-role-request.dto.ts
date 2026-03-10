import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  Min,
} from 'class-validator';

export class CreateRoleRequestDto {
  @IsDefined({ message: 'El nombre del rol es obligatorio' })
  @IsString({ message: 'El nombre del rol debe ser de tipo string' })
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsDefined({ message: 'La descripción del rol es obligatoria' })
  @IsString({ message: 'La descripción del rol debe ser de tipo string' })
  @Transform(({ value }) => value.toLowerCase())
  description: string;

  @IsArray({
    message: 'El campo "permissions" debe ser un arreglo de números.',
  })
  @ArrayNotEmpty({ message: 'Debes asignar al menos un permiso al rol.' })
  @IsInt({
    each: true,
    message: 'Cada permiso debe ser un número entero válido.',
  })
  @Min(1, {
    each: true,
    message: 'Los IDs de permisos deben ser mayores o iguales a 1.',
  })
  @Type(() => Number)
  permissions: number[];
}
