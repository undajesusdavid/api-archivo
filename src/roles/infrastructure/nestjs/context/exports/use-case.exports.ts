import { CreateRoleUseCase } from 'src/roles/app/create-role/create-role.use-case';
import { DeleteRoleUseCase } from 'src/roles/app/delete-role/delete-role.use-case';
import { UpdateRoleUseCase } from 'src/roles/app/update-role/update-role.use-case';

export const UseCaseExports = [
  CreateRoleUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
];
