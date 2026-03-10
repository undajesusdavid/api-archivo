import { SequelizeUserRepository } from '../../../persistence/sequelize/user.repository';
import { USER_REPOSITORY } from 'src/users/core/contracts/UserRepository';

import { HashedServiceImp } from '../../../services/HashedServiceImp';
import { HASHED_SERVICE } from 'src/users/core/contracts/HashedService';

import { AuthTokenServiceImp } from '../../../services/AuthTokenServiceImp';
import { AUTH_TOKEN_SERVICE } from 'src/users/core/contracts/AuthTokenService';

export const ServicesProvider = [
  {
    provide: USER_REPOSITORY,
    useClass: SequelizeUserRepository,
  },
  {
    provide: HASHED_SERVICE,
    useClass: HashedServiceImp,
  },
  {
    provide: AUTH_TOKEN_SERVICE,
    useClass: AuthTokenServiceImp,
  },
];
