export const HASHED_SERVICE = Symbol('HashedService');

export interface HashedService {
  hashed(rawPassword: string): string;
  compare(rawPassword: string, hashedPassword: string): boolean;
}
