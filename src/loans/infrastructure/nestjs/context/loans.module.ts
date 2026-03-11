import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/infrastructure/adapters/nest/context/shared.module';
import { UserModule } from '../../../../users/infrastructure/nestjs/context/user.module';
import { InventoryModule } from '../../../../inventory/infrastructure/nestjs/context/inventory.module';
import { NestBaseModule } from 'src/shared/infrastructure/adapters/nest/bus/base-module';
import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';
import { NestCommandBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-query-bus';
import { LoansController } from '../controllers/loans.controller';
import { TypeOrmLoanModel } from '../../persistence/typeorm/loan.model';
import { TypeOrmHistoryModel } from '../../persistence/typeorm/history.model';
import { TypeOrmLoanRepository } from '../../persistence/typeorm/loan.repository';
import { LOAN_REPOSITORY } from '../../../core/contracts/LoanRepository';
import { TypeOrmLoanMapper } from '../../persistence/typeorm/loan.mapper';
import { TypeOrmHistoryRepository } from '../../persistence/typeorm/history.repository';
import { HISTORY_REPOSITORY } from '../../../core/contracts/HistoryRepository';
import { TypeOrmHistoryMapper } from '../../persistence/typeorm/history.mapper';
import { RequestLoanUseCase } from '../../../app/request-loan/request-loan.use-case';
import { RequestLoanCommand } from '../../../app/request-loan/request-loan.command';
import { ApproveLoanUseCase } from '../../../app/approve-loan/approve-loan.use-case';
import { ApproveLoanCommand } from '../../../app/approve-loan/approve-loan.command';
import { GenerateLoanReportUseCase } from '../../../app/generate-loan-report/generate-loan-report.use-case';
import { PDF_SERVICE } from '../../../core/contracts/PdfService';
import { PdfServiceImp } from '../../services/PdfServiceImp';

@Module({
  imports: [
    SharedModule,
    UserModule,
    InventoryModule,
    TypeOrmModule.forFeature([TypeOrmLoanModel, TypeOrmHistoryModel]),
  ],
  controllers: [LoansController],
  providers: [
    {
      provide: LOAN_REPOSITORY,
      useClass: TypeOrmLoanRepository,
    },
    {
      provide: HISTORY_REPOSITORY,
      useClass: TypeOrmHistoryRepository,
    },
    {
      provide: PDF_SERVICE,
      useClass: PdfServiceImp,
    },
    TypeOrmLoanMapper,
    TypeOrmHistoryMapper,
    RequestLoanUseCase,
    ApproveLoanUseCase,
    GenerateLoanReportUseCase,
  ],
  exports: [LOAN_REPOSITORY, HISTORY_REPOSITORY],
})
export class LoansModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Loans', commandBus, queryBus);
  }

  protected registerCommands(): void {
    this.commandBus.register(RequestLoanCommand, RequestLoanUseCase);
    this.commandBus.register(ApproveLoanCommand, ApproveLoanUseCase);
  }

  protected registerQueries(): void {}
}
