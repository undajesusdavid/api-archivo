import { Injectable } from '@nestjs/common';
import { IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';
import { ErrorUuidService } from 'src/shared/app/errors/ErrorUuidService';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class UuidService implements IUuidService {
  isValidUUID(uuid: string): boolean {
    const uuidV7Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV7Regex.test(uuid);
  }

  generateUUID(): string {
    try {
      return uuidv7();
    } catch (error) {
      throw new ErrorUuidService(
        'Error al intentar generar el UUID',
        'UUID_GENERATE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'generate',
        },
      );
    }
  }
}
