import { Query } from 'src/shared/app/bus/query';

export class GetUserQuery implements Query {
  constructor(public readonly id: string) {}
}
