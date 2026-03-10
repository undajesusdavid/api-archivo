export abstract class StringValueObject {
  private readonly value: string;

  constructor(value: string) {
    this.validation(value);
    this.value = value;
  }

  private validation(value: string): void {
    if (typeof value !== 'string') {
      throw new Error(`El valor debe ser una cadena de texto: ${value}`);
    }

    if (value.trim() === '') {
      throw new Error(`El valor no puede estar vacío: ${value}`);
    }
  }

  public getValue(): string {
    return this.value;
  }
}
