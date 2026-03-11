import { Controller, Post, Body, Get, Param, Inject, Res } from '@nestjs/common';
import { RequestLoanCommand } from '../../../app/request-loan/request-loan.command';
import { ApproveLoanCommand } from '../../../app/approve-loan/approve-loan.command';
import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';
import type { Response } from 'express';
import { GenerateLoanReportUseCase, GenerateLoanReportCommand } from '../../../app/generate-loan-report/generate-loan-report.use-case';

@Controller('loans')
export class LoansController {
  constructor(
    @Inject(COMMAND_BUS)
    private readonly commandBus: CommandBus,
    private readonly generateLoanReportUseCase: GenerateLoanReportUseCase,
  ) {}

  @Post('requests')
  async requestLoan(@Body() body: any) {
    const command = new RequestLoanCommand(body.id, body.requesterId, body.targetId, body.targetType, body.notes);
    await this.commandBus.execute(command);
    return { status: 'success', message: 'Loan request submitted successfully' };
  }

  @Post(':id/approve')
  async approveLoan(@Param('id') id: string, @Body() body: any) {
    const command = new ApproveLoanCommand(id, body.archivistId, new Date(body.dueDate));
    await this.commandBus.execute(command);
    return { status: 'success', message: 'Loan request approved successfully' };
  }

  @Get(':id/acta')
  async generateActa(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.generateLoanReportUseCase.execute(new GenerateLoanReportCommand(id));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="acta_prestamo_${id}.pdf"`,
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  }
}
