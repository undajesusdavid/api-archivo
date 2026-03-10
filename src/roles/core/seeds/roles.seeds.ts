export const ROLES = {
  ROOT: {
    name: 'root',
    description: 'Rol con todos los permisos',
    isActive: true,
  },
  ADMIN: {
    name: 'admin',
    description: 'Rol con permisos para administrar el sistema',
    isActive: true,
  },
  USER: {
    name: 'user',
    description: 'Rol con permisos limitados para usuarios estándar',
    isActive: true,
  },
} as const;
