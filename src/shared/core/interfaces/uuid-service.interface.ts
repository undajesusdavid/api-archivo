export const UUID_SERVICE = Symbol('UuidService');

export interface IUuidService {
  generateUUID(): string;
  isValidUUID(uuid: string): boolean;
}
