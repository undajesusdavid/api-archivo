import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/infrastructure/adapters/nest/security/guards/jwt-auth.guard';
import { AccessGuard } from 'src/shared/infrastructure/adapters/nest/security/guards/access.guard';
import { Permissions } from 'src/shared/infrastructure/adapters/nest/security/decorators/permissions.decorator';
import { PERMISSIONS } from 'src/permissions/core/seeds/Permission.seeds';
// ENTIDAD DEL DOMINIO
import { Role } from 'src/roles/core/entities/Role';
// DTOs request
import { UpdateRoleRequestDto } from '../dto/update-role-request.dto';
import { CreateRoleRequestDto } from '../dto/create-role-request.dto';
// DTOs response
import { RoleResponseDto } from '../dto/role-response.dto';
// PATRON BUS
import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';
// COMMANDS
import { CreateRoleCommand } from 'src/roles/app/create-role/create-role.command';
import { DeleteRoleCommand } from 'src/roles/app/delete-role/delete-role.command';
import { UpdateRoleCommand } from 'src/roles/app/update-role/update-role.command';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(COMMAND_BUS) private readonly command: CommandBus,
    @Inject(QUERY_BUS) private readonly query: QueryBus,
  ) {}

  @Post('/create')
  @Permissions(PERMISSIONS.CREATE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async create(@Body() dto: CreateRoleRequestDto): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new CreateRoleCommand({
        name: dto.name,
        description: dto.description,
        permissions: dto.permissions,
      }),
    );
    return new RoleResponseDto(role);
  }

  @Put('/update/:id')
  @Permissions(PERMISSIONS.UPDATE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleRequestDto,
  ): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new UpdateRoleCommand({
        id,
        data: {
          name: dto.name,
          description: dto.description,
          isActive: dto.isActive,
          permissions: dto.permissions,
        },
      }),
    );
    return new RoleResponseDto(role);
  }

  @Delete('/delete/:id')
  @Permissions(PERMISSIONS.DELETE_ROLE.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async delete(@Param('id') id: string): Promise<RoleResponseDto> {
    const role = await this.command.execute<Role>(
      new DeleteRoleCommand({ id }),
    );
    return new RoleResponseDto(role);
  }
}
