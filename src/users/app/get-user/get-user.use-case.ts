import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { User } from 'src/users/core/entities/User';
import { UserRepository } from '../../core/contracts/UserRepository';
import { NotFoundError } from 'src/shared/core/errors/app-error';
import { GetUserQuery } from './get-user.query';

export const GETUSER_USERCASE = Symbol('GetUserUseCase');

export class GetUserUseCase extends BaseUseCase<GetUserQuery, User> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected async internalExecute(query: GetUserQuery): Promise<User> {
    const id = query.id;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }
}
