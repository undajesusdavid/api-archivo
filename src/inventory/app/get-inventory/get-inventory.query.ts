import { Query } from 'src/shared/app/bus/query';

export class GetInventoryQuery implements Query {
  constructor(
    public readonly type: 'box' | 'folder' | 'record' | 'document',
    public readonly filters?: Record<string, any>,
  ) {}
}
