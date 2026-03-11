// Servicios
import {
  IUnitOfWork,
  UNIT_OF_WORK,
} from 'src/shared/core/interfaces/unit-of-work.interface';
import {
  ROLE_REPOSITORY,
  RoleRepository,
} from 'src/roles/core/contracts/RoleRepository';
import {
  PERMISSION_REPOSITORY,
  PermissionRepository,
} from 'src/permissions/core/contracts/PermissionRepository';
import {
  UUID_SERVICE,
  IUuidService,
} from 'src/shared/core/interfaces/uuid-service.interface';

// Use Cases
import { CreateRoleUseCase } from 'src/roles/app/create-role/create-role.use-case';
import { DeleteRoleUseCase } from 'src/roles/app/delete-role/delete-role.use-case';
import { UpdateRoleUseCase } from 'src/roles/app/update-role/update-role.use-case';

export const UseCasesProvider = [
  {
    provide: CreateRoleUseCase,
    useFactory: (
      uow: IUnitOfWork,
      uuid: IUuidService,
      roleRepo: RoleRepository,
      permissionRepo: PermissionRepository,
    ) => new CreateRoleUseCase(uow, uuid, roleRepo, permissionRepo),
    inject: [
      UNIT_OF_WORK,
      UUID_SERVICE,
      ROLE_REPOSITORY,
      PERMISSION_REPOSITORY,
    ],
  },
  {
    provide: UpdateRoleUseCase,
    useFactory: (
      r: RoleRepository,
      p: PermissionRepository,
      uow: IUnitOfWork,
    ) => new UpdateRoleUseCase(r, p, uow),
    inject: [ROLE_REPOSITORY, PERMISSION_REPOSITORY, UNIT_OF_WORK],
  },
  {
    provide: DeleteRoleUseCase,
    useFactory: (roleRepo: RoleRepository) => new DeleteRoleUseCase(roleRepo),
    inject: [ROLE_REPOSITORY],
  },
];
