// src/shared/core/errors/app-error.ts

export abstract class AppError extends Error {
  public readonly isDomainError = true;
  public readonly timestamp: string;

  constructor(
    public readonly message: string,
    public readonly code: string = 'GENERIC_ERROR',
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

// Ejemplo: Error de conflicto (409)
export class AlreadyExistsError extends AppError {
  constructor(entity: string, value: string) {
    super(`${entity} con valor "${value}" ya existe.`, 'ALREADY_EXISTS');
  }
}

// Recurso no encontrado (404)
export class NotFoundError extends AppError {
  constructor(entity: string, value: string) {
    super(`${entity} con valor "${value}" no fue encontrado.`, 'NOT_FOUND');
  }
}
