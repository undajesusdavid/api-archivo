import { Transform } from 'class-transformer';

export function ToBoolean() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      const lower = value.toLowerCase();
      if (lower === 'true' || lower === '1') return true;
      if (lower === 'false' || lower === '0') return false;
    }
    if (typeof value === 'number') {
      if (value === 1) return true;
      if (value === 0) return false;
    }
    return value; // si ya es boolean o no coincide, se deja igual
  });
}
