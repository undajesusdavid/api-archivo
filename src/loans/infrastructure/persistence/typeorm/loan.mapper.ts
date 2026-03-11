import { BaseMapper } from 'src/shared/infrastructure/base/mapper/base.mapper';
import { Loan } from '../../../core/entities/Loan';
import { TypeOrmLoanModel } from './loan.model';

export class TypeOrmLoanMapper extends BaseMapper<Loan, TypeOrmLoanModel> {
  toDomain(model: TypeOrmLoanModel): Loan {
    return new Loan({
      id: model.id,
      requesterId: model.requesterId,
      targetId: model.targetId,
      targetType: model.targetType,
      requestDate: model.requestDate,
      loanDate: model.loanDate,
      dueDate: model.dueDate,
      returnDate: model.returnDate,
      status: model.status,
      notes: model.notes,
    });
  }

  toPersistence(entity: Loan): TypeOrmLoanModel {
    const model = new TypeOrmLoanModel();
    model.id = entity.getId();
    model.requesterId = entity.getRequesterId();
    model.targetId = entity.getTargetId();
    model.targetType = entity.getTargetType();
    model.requestDate = entity.getRequestDate();
    model.loanDate = entity.getLoanDate();
    model.dueDate = entity.getDueDate();
    model.returnDate = entity.getReturnDate();
    model.status = entity.getStatus();
    model.notes = entity.getNotes();
    return model;
  }
}
