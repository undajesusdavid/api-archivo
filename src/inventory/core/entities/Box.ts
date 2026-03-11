import { InventoryStatus } from '../value-objects/InventoryStatus';
import { ConservationStatus } from '../value-objects/ConservationStatus';

export interface BoxProps {
  id: string;
  locationCode: string;
  creationDate: Date;
  metadata: Record<string, any>;
  status: InventoryStatus;
  conservationStatus: ConservationStatus;
}

export class Box {
  private readonly id: string;
  private locationCode: string;
  private readonly creationDate: Date;
  private metadata: Record<string, any>;
  private status: InventoryStatus;
  private conservationStatus: ConservationStatus;

  constructor(props: BoxProps) {
    this.id = props.id;
    this.locationCode = props.locationCode;
    this.creationDate = props.creationDate;
    this.metadata = props.metadata;
    this.status = props.status;
    this.conservationStatus = props.conservationStatus;
  }

  getId(): string {
    return this.id;
  }

  getLocationCode(): string {
    return this.locationCode;
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

  updateLocation(code: string): void {
    this.locationCode = code;
  }

  updateStatus(status: InventoryStatus): void {
    this.status = status;
  }

  updateConservation(status: ConservationStatus): void {
    this.conservationStatus = status;
  }
}
