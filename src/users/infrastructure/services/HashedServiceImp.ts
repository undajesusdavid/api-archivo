import { Injectable } from '@nestjs/common';
import { HashedService } from 'src/users/core/contracts/HashedService';
import * as bcrypt from 'bcrypt';
import { ErrorHashedService } from 'src/users/app/errors/ErrorHashedService';

@Injectable()
export class HashedServiceImp implements HashedService {
  private readonly saltRounds = 10;

  hashed(rawPassword: string): string {
    try {
      const salt = bcrypt.genSaltSync(this.saltRounds);
      return bcrypt.hashSync(rawPassword, salt);
    } catch (error) {
      throw new ErrorHashedService(
        'Error al intentar hashear la contraseña',
        'HASHED_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'hashed',
        },
      );
    }
  }

  compare(rawPassword: string, hashedPassword: string): boolean {
    try {
      return bcrypt.compareSync(rawPassword, hashedPassword);
    } catch (error) {
      throw new ErrorHashedService(
        'Error al intentar comparar las contraseñas',
        'HASHED_COMPARE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'compare',
        },
      );
    }
  }
}
