import { InventoryStatus } from '../value-objects/InventoryStatus';
import { ConservationStatus } from '../value-objects/ConservationStatus';

export interface FolderProps {
  id: string;
  boxId: string;
  code: string;
  creationDate: Date;
  metadata: Record<string, any>;
  status: InventoryStatus;
  conservationStatus: ConservationStatus;
}

export class Folder {
  private readonly id: string;
  private readonly boxId: string;
  private code: string;
  private readonly creationDate: Date;
  private metadata: Record<string, any>;
  private status: InventoryStatus;
  private conservationStatus: ConservationStatus;

  constructor(props: FolderProps) {
    this.id = props.id;
    this.boxId = props.boxId;
    this.code = props.code;
    this.creationDate = props.creationDate;
    this.metadata = props.metadata;
    this.status = props.status;
    this.conservationStatus = props.conservationStatus;
  }

  getId(): string {
    return this.id;
  }

  getBoxId(): string {
    return this.boxId;
  }

  getCode(): string {
    return this.code;
  }

  getCreationDate(): Date {
    return this.creationDate;
  }

  getMetadata(): Record<string, any> {
    return this.metadata;
  }

  getStatus(): InventoryStatus {
    return this.status;
  }

  getConservationStatus(): ConservationStatus {
    return this.conservationStatus;
  }

  updateStatus(status: InventoryStatus): void {
    this.status = status;
  }

  updateConservation(status: ConservationStatus): void {
    this.conservationStatus = status;
  }
}
