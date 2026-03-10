import { PermissionID } from '../value-objects/PermissionId';

interface PermissionProps {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export class Permission {
  private readonly id: PermissionID;
  private name: string;
  private description: string;
  private isActive: boolean;

  constructor(props: PermissionProps) {
    this.id = new PermissionID(props.id);
    this.name = props.name;
    this.description = props.description;
    this.isActive = props.isActive;
  }

  getId(): number {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
