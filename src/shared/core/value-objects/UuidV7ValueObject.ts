import { StringValueObject } from './StringValueObject';

export abstract class UuidV7ValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.uuidValidation(value);
  }

  private uuidValidation(value: string): void {
    const uuidV7Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidV7Regex.test(value)) {
      throw new Error(`Invalid UUIDv7: ${value}`);
    }
  }
}
