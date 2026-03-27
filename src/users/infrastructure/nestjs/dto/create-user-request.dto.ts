import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from 'src/users/core/entities/User';
import { Match } from 'src/shared/infrastructure/base/decorators/validation/match-constraint';

export class CreateUserRequestDto {
  //--------------------------------------------------------------------------------
  @IsDefined({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser de tipo string' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;
  //--------------------------------------------------------------------------------
  @IsDefined({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser de tipo string' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password: string;

  //----------------------------------------------------------------------- 
  @IsDefined({ message: 'Debes confirmar la contraseña' })
  @Match('password', { message: 'Las contraseñas no coinciden' })
  passwordConfirm: string;
  //--------------------------------------------------------------------------------
  @IsDefined({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email: string;
  //--------------------------------------------------------------------------------
}

export class CreateUserDtoResponse {
  id: string;
  username: string;
  email: string;

  constructor(user: User) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
  }
}
