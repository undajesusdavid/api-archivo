import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ToBoolean } from 'src/shared/infrastructure/base/decorators/transform/ToBoolean';
//import { IsUUIDv7 } from "src/shared/infrastructure/base/decorators/validation/IsUUIDv7";

import { User } from 'src/users/core/entities/User';

export class UpdateUserRequestDto {
  /*@IsDefined({ message: 'El id es obligatorio' })
    @IsString({ message: 'El id debe ser de tipo string' })
    @IsUUIDv7({ message: 'El id debe ser un UUID válido' })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    id: string;*/
  //--------------------------------------------------------------------------------
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser de tipo string' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username?: string;
  //--------------------------------------------------------------------------------
  @IsOptional()
  @IsString({ message: 'El email debe ser de tipo string' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email?: string;
  //--------------------------------------------------------------------------------
  @IsOptional()
  @ToBoolean()
  @IsBoolean({ message: 'El campo activo debe ser de tipo booleano' })
  active?: boolean;
  //--------------------------------------------------------------------------------
}

export class UpdateUserDtoResponse {
  id: string;
  username: string;
  email: string;

  constructor(user: User) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
  }
}
