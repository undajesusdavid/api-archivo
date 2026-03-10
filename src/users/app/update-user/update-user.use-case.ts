import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { UpdateUserCommand } from './update-user.command';
import { User } from 'src/users/core/entities/User';
import { UserRepository } from 'src/users/core/contracts/UserRepository';

export class UpdateUserUseCase extends BaseUseCase<UpdateUserCommand, User> {
  constructor(private userRepo: UserRepository) {
    super();
  }

  async internalExecute(command: UpdateUserCommand): Promise<User> {
    const { id, data } = command.props;

    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new Error(`No se encontró ningún usuario con el ID: ${id}`);
    }

    if (data.username !== undefined) {
      user.setUsername(data.username);
    }

    if (data.email !== undefined) {
      user.setEmail(data.email);
    }

    if (data.active !== undefined) {
      user.setActive(data.active);
    }

    this.userRepo.update(user.getId(), user);

    return user;
  }
}
