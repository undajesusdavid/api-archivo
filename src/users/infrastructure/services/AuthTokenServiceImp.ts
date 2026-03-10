import { AuthTokenService } from 'src/users/core/contracts/AuthTokenService';
import * as jwt from 'jsonwebtoken';
import { ErrorAuthTokenService } from 'src/users/app/errors/ErrorAuthTokenService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthTokenServiceImp implements AuthTokenService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret_key';
  private readonly expiresIn = '1h'; // Puedes ajustar el tiempo de expiración

  async auth(payload: any): Promise<string> {
    try {
      const token = jwt.sign(payload, this.secret, {
        expiresIn: this.expiresIn,
        algorithm: 'HS256',
      });

      return token;
    } catch (error) {
      throw new ErrorAuthTokenService(
        'Error al intentar crear el token de la session',
        'SIGN_TOKEN_FAILED',
        { originalError: error, class: this.constructor.name, method: 'auth' },
      );
    }
  }

  async verify(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (error) {
      throw new ErrorAuthTokenService(
        'Error al intentar verificar el token',
        'VERIFY_TOKEN_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'verify',
        },
      );
    }
  }
}
