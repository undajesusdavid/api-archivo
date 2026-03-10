import { RoleID } from '../value-objects/RoleId';
import { RoleName } from '../value-objects/RoleName';
import { RolePermissionList } from '../value-objects/RolePermissionList';

export interface RoleProps {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export class Role {
  // Datos Base
  private readonly id: RoleID;
  private name: RoleName;
  private description: string;
  private isActive: boolean;

  // Datos extra
  private permissions: RolePermissionList;

  private constructor(props: RoleProps) {
    this.id = new RoleID(props.id);
    this.name = new RoleName(props.name);
    this.description = props.description;
    this.isActive = props.isActive;
  }

  // Metodos estaticos para instanciar Role
  public static create(props: RoleProps): Role {
    return new Role({ ...props, isActive: true });
  }

  public static restore(props: RoleProps): Role {
    return new Role({ ...props });
  }

  // Getters
  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name.getValue();
  }

  getDescription(): string {
    return this.description;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getPermissions(): number[] {
    return this.permissions ? this.permissions.getValue() : [];
  }

  // Setters

  setName(name: string): void {
    this.name = new RoleName(name);
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setIsActive(status: boolean): void {
    this.isActive = status;
  }

  setPermissions(permissions: number[]): void {
    this.permissions = new RolePermissionList(permissions);
  }
}
