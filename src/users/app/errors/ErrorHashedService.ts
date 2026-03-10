export class ErrorHashedService extends Error {
  public readonly code: string;
  public readonly context?: any;

  constructor(
    message: string,
    code: string = 'HASHED_SERVICE_ERROR',
    context?: any,
  ) {
    super(message); // Esto asigna el mensaje al error base
    this.name = this.constructor.name;
    this.code = code;
    this.context = context;

    // Mantiene el stack trace correcto
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHashedService);
    }
  }
}
