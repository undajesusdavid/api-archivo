import { TypeOrmUserRepository } from '../../../persistence/typeorm/user.repository';
import { USER_REPOSITORY } from 'src/users/core/contracts/UserRepository';
import { AuthTokenServiceImp } from '../../../services/AuthTokenServiceImp';
import { AUTH_TOKEN_SERVICE } from 'src/users/core/contracts/AuthTokenService';
import { HashedServiceImp } from '../../../services/HashedServiceImp';
import { HASHED_SERVICE } from 'src/users/core/contracts/HashedService';

export const ServicesProvider = [
  {
    provide: USER_REPOSITORY,
    useClass: TypeOrmUserRepository,
  },
  {
    provide: AUTH_TOKEN_SERVICE,
    useClass: AuthTokenServiceImp,
  },
  {
    provide: HASHED_SERVICE,
    useClass: HashedServiceImp,
  },
];
