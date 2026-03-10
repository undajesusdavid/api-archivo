// Servicios Externos

// Servicios
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/users/core/contracts/UserRepository';
import {
  HASHED_SERVICE,
  HashedService,
} from 'src/users/core/contracts/HashedService';
import {
  AUTH_TOKEN_SERVICE,
  AuthTokenService,
} from 'src/users/core/contracts/AuthTokenService';
import {
  UUID_SERVICE,
  IUuidService,
} from 'src/shared/core/interfaces/uuid-service.interface';
// Casos de Uso

import { GetUserUseCase } from 'src/users/app/get-user/get-user.use-case';
import { GetUsersUseCase } from 'src/users/app/get-users/get-users.use-case';
import { AuthUserUseCase } from 'src/users/app/auth-user/auth-user.use-case';
import { CreateUserUseCase } from 'src/users/app/create-user/create-user.use-case';
import { UpdateUserUseCase } from 'src/users/app/update-user/update-user.use-case';
import { DeleteUserUseCase } from 'src/users/app/delete-user/delete-user.use-case';

export const UseCasesProvider = [
  {
    provide: GetUserUseCase,
    useFactory: (repo: UserRepository) => new GetUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: CreateUserUseCase,
    useFactory: (
      repo: UserRepository,
      uuid: IUuidService,
      hash: HashedService,
    ) => new CreateUserUseCase(repo, uuid, hash),
    inject: [USER_REPOSITORY, UUID_SERVICE, HASHED_SERVICE],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: GetUsersUseCase,
    useFactory: (repo: UserRepository) => new GetUsersUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: AuthUserUseCase,
    useFactory: (
      repo: UserRepository,
      authToken: AuthTokenService,
      hashed: HashedService,
    ) => new AuthUserUseCase(repo, authToken, hashed),
    inject: [USER_REPOSITORY, AUTH_TOKEN_SERVICE, HASHED_SERVICE],
  },
];
