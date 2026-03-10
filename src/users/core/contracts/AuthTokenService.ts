export const AUTH_TOKEN_SERVICE = Symbol('AuthTokenService');

export interface AuthTokenService {
  auth(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
