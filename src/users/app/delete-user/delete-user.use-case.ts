import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { DeleteUserCommand } from './delete-user.command';
import { User } from 'src/users/core/entities/User';
import { UserRepository } from 'src/users/core/contracts/UserRepository';
import { NotFoundError } from 'src/shared/core/errors/app-error';

export class DeleteUserUseCase extends BaseUseCase<DeleteUserCommand, User> {
  constructor(private userRepo: UserRepository) {
    super();
  }

  async internalExecute(command: DeleteUserCommand): Promise<User> {
    const { id } = command.props;

    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('Usuario', id);
    }

    await this.userRepo.delete(user.getId());

    return user;
  }
}
