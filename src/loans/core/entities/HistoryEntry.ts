export enum HistoryAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  MOVED = 'MOVED',
  LENT = 'LENT',
  RETURNED = 'RETURNED',
  LOST = 'LOST',
  REVIEWED = 'REVIEWED',
}

export enum HistoryTargetType {
  BOX = 'BOX',
  FOLDER = 'FOLDER',
  RECORD = 'RECORD',
  DOCUMENT = 'DOCUMENT',
}

export interface HistoryProps {
  id: string;
  targetId: string;
  targetType: HistoryTargetType;
  action: HistoryAction;
  userId: string;
  date: Date;
  details?: string;
}

export class HistoryEntry {
  private readonly id: string;
  private readonly targetId: string;
  private readonly targetType: HistoryTargetType;
  private readonly action: HistoryAction;
  private readonly userId: string;
  private readonly date: Date;
  private readonly details?: string;

  constructor(props: HistoryProps) {
    this.id = props.id;
    this.targetId = props.targetId;
    this.targetType = props.targetType;
    this.action = props.action;
    this.userId = props.userId;
    this.date = props.date;
    this.details = props.details;
  }

  getId(): string { return this.id; }
  getTargetId(): string { return this.targetId; }
  getTargetType(): HistoryTargetType { return this.targetType; }
  getAction(): HistoryAction { return this.action; }
  getUserId(): string { return this.userId; }
  getDate(): Date { return this.date; }
  getDetails(): string | undefined { return this.details; }
}
