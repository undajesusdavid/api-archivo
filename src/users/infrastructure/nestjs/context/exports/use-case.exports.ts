import { AuthUserUseCase } from 'src/users/app/auth-user/auth-user.use-case';
import { CreateUserUseCase } from 'src/users/app/create-user/create-user.use-case';
import { DeleteUserUseCase } from 'src/users/app/delete-user/delete-user.use-case';
import { GetUserUseCase } from 'src/users/app/get-user/get-user.use-case';
import { GetUsersUseCase } from 'src/users/app/get-users/get-users.use-case';
import { UpdateUserUseCase } from 'src/users/app/update-user/update-user.use-case';

export const UseCaseExports = [
  GetUserUseCase,
  GetUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  AuthUserUseCase,
];
