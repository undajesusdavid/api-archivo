import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateBoxCommand } from '../../../app/create-box/create-box.command';
import { GetInventoryQuery } from '../../../app/get-inventory/get-inventory.query';
import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';

@Controller('inventory')
export class InventoryController {
  constructor(
    @Inject(COMMAND_BUS)
    private readonly commandBus: CommandBus,
    @Inject(QUERY_BUS)
    private readonly queryBus: QueryBus,
  ) {}

  @Post('boxes')
  async createBox(@Body() body: { id: string, locationCode: string, metadata?: Record<string, any>, conservationStatus?: string }) {
    const command = new CreateBoxCommand(body.id, body.locationCode, body.metadata, body.conservationStatus);
    await this.commandBus.execute(command);
    return { status: 'success', message: 'Box created successfully' };
  }

  @Get(':type')
  async getInventory(@Param('type') type: 'box' | 'folder' | 'record' | 'document') {
    const query = new GetInventoryQuery(type);
    return await this.queryBus.execute(query);
  }
}
