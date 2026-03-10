export const PERMISSIONS = {
  ALL: { name: '*', description: 'Permite todos los permisos' },
  //Control de acceso - Roles
  CREATE_ROLE: {
    name: 'create:role',
    description: 'Permite crear nuevos roles',
  },
  READ_ROLES: {
    name: 'read:role',
    description: 'Permite leer la lista de roles',
  },
  UPDATE_ROLE: {
    name: 'update:role',
    description: 'Permite actualizar la información de un rol',
  },
  DELETE_ROLE: { name: 'delete:role', description: 'Permite eliminar un rol' },
  ASSIGN_ROLES: {
    name: 'assign:role',
    description: 'Permite asignar roles a los usuarios',
  },
  STATUS_ROLE: {
    name: 'status:role',
    description: 'Permite activar o desactivar un rol',
  },
  //Control de acceso - Permisos
  CREATE_PERMISSION: {
    name: 'create:permission',
    description: 'Permite crear nuevos permisos',
  },
  READ_PERMISSIONS: {
    name: 'read:permission',
    description: 'Permite leer la lista de permisos',
  },
  UPDATE_PERMISSION: {
    name: 'update:permission',
    description: 'Permite actualizar la información de un permiso',
  },
  DELETE_PERMISSION: {
    name: 'delete:permission',
    description: 'Permite eliminar un permiso',
  },
  ASSIGN_PERMISSIONS: {
    name: 'assign:permission',
    description: 'Permite asignar permisos a los roles',
  },
  STATUS_PERMISSION: {
    name: 'status:permission',
    description: 'Permite activar o desactivar un permiso',
  },
  // Usuarios
  CREATE_USER: {
    name: 'create:user',
    description: 'Permite crear nuevos usuarios',
  },
  READ_USERS: {
    name: 'read:users',
    description: 'Permite leer la lista de usuarios',
  },
  UPDATE_USER: {
    name: 'update:user',
    description: 'Permite actualizar la información de un usuario',
  },
  DELETE_USER: {
    name: 'delete:user',
    description: 'Permite eliminar un usuario',
  },
  STATUS_USER: {
    name: 'status:user',
    description: 'Permite activar o desactivar un usuario',
  },
} as const;
