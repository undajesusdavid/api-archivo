import { RoleRepository } from 'src/roles/core/contracts/RoleRepository';
import { Role } from '../../core/entities/Role';
import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { DeleteRoleCommand } from './delete-role.command';
import { NotFoundError } from 'src/shared/core/errors/app-error';

export class DeleteRoleUseCase extends BaseUseCase<DeleteRoleCommand, Role> {
  constructor(private readonly roleRepo: RoleRepository) {
    super();
  }

  protected async internalExecute(command: DeleteRoleCommand): Promise<Role> {
    const { id } = command.props;
    const role = await this.roleRepo.findById(id);

    if (!role) {
      throw new NotFoundError('Role', id);
    }

    await this.roleRepo.delete(command.props.id);

    return role;
  }
}
