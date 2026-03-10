import { StringValueObject } from './StringValueObject';

export abstract class NameValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.nameValidation(value);
  }

  private nameValidation(value: string): void {
    if (value.length < 1) {
      throw new Error(`El nombre ${value} debe tener al menos 1 caracter`);
    }

    if (value.length > 50) {
      throw new Error(
        `El nombre ${value} excede la longitud máxima de 50 caracteres`,
      );
    }
  }
}
