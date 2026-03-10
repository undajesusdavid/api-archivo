import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import validator from 'validator';

/**
 * Decorador personalizado para validar que un campo sea UUID versión 7
 */
export function IsUUIDv7(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDv7',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && validator.isUUID(value, 7);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser un UUID versión 7 válido`;
        },
      },
    });
  };
}
