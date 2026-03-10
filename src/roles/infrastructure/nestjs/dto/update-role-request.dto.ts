import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  Min,
  IsOptional,
  isDefined,
  IsBoolean,
} from 'class-validator';
import { ToBoolean } from 'src/shared/infrastructure/base/decorators/transform/ToBoolean';

export class UpdateRoleRequestDto {
  @IsOptional()
  @IsString({ message: 'El nombre del rol debe ser de tipo string' })
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @IsOptional()
  @IsString({ message: 'La descripción del rol debe ser de tipo string' })
  @Transform(({ value }) => value.toLowerCase())
  description?: string;

  @IsOptional()
  @ToBoolean()
  @IsBoolean({ message: 'El estatus del rol debe ser un booleano' })
  isActive?: boolean;

  @IsOptional()
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
  permissions?: number[];
}
