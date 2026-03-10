import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { AuthUserCommand } from './auth-user.command';
import { AuthUserResponse } from './auth-user.response';
import { UserRepository } from 'src/users/core/contracts/UserRepository';
import { AuthTokenService } from 'src/users/core/contracts/AuthTokenService';
import { HashedService } from 'src/users/core/contracts/HashedService';

export class AuthUserUseCase extends BaseUseCase<
  AuthUserCommand,
  AuthUserResponse
> {
  constructor(
    private userRepo: UserRepository,
    private authToken: AuthTokenService,
    private hashed: HashedService,
  ) {
    super();
  }

  async internalExecute(command: AuthUserCommand): Promise<AuthUserResponse> {
    const { username, password } = command;

    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error('Nombre de usuario invalido');
    }
    if (!user.isActive()) {
      throw new Error('El usuario no esta activo');
    }

    const isPassword = this.hashed.compare(password, user.getPassword());
    if (!isPassword) {
      throw new Error('La contraseña es invalida');
    }

    const userId = user.getId();
    const userName = user.getUsername();
    const token = await this.authToken.auth({
      id: userId,
      username: userName,
      permissions: user.getPermissions(),
    });

    return {
      token: token,
      id: userId,
      username: userName,
    } as AuthUserResponse;
  }
}
