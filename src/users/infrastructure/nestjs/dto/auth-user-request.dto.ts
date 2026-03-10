import { Transform } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { AuthUserResponse } from 'src/users/app/auth-user/auth-user.response';

export class AuthUserRequestDto {
  //--------------------------------------------------------------------------
  @IsDefined({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser de tipo string' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username: string;
  //--------------------------------------------------------------------------
  @IsDefined({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser de tipo string' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password: string;
  //--------------------------------------------------------------------------
}

export class AuthUserDtoResponse {
  token: string;
  id: string;
  username: string;

  constructor(auth: AuthUserResponse) {
    this.token = auth.token;
    this.id = auth.id;
    this.username = auth.username;
  }
}
