export abstract class NumberListValueObject {
  // Marcamos como readonly para que no se pueda reasignar
  protected readonly value: number[];

  constructor(value: number[]) {
    // 1. Validar primero
    this.numberListValidation(value);

    // 2. Asignar una COPIA para asegurar inmutabilidad
    // También aprovechamos para limpiar duplicados si el negocio lo permite
    this.value = [...new Set(value)];
  }

  private numberListValidation(value: number[]): void {
    // Validación de tipo básica
    if (!Array.isArray(value)) {
      throw new Error(`Entrada inválida: Se esperaba un arreglo de números.`);
    }

    // Validación de contenido: ¿Son todos números?
    // Usamos 'some' para detectar rápidamente si hay algo que no sea un número
    const hasNonNumbers = value.some(
      (item) => typeof item !== 'number' || isNaN(item),
    );

    if (hasNonNumbers) {
      throw new Error(
        `El arreglo contiene elementos que no son números válidos.`,
      );
    }
  }

  // Retornamos una copia para que nadie pueda hacer un .push() desde fuera
  getValue(): number[] {
    return [...this.value];
  }
}
