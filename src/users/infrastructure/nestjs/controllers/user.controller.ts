import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// Import DTO
import {
  CreateUserRequestDto,
  CreateUserDtoResponse,
} from '../dto/create-user-request.dto';
import {
  UpdateUserRequestDto,
  UpdateUserDtoResponse,
} from '../dto/update-user-request.dto';
import { GetUserDtoResponse } from '../dto/get-user-request.dto';
import {
  AuthUserRequestDto,
  AuthUserDtoResponse,
} from '../dto/auth-user-request.dto';

// Import Guards
import { JwtAuthGuard } from 'src/shared/infrastructure/adapters/nest/security/guards/jwt-auth.guard';
import { AccessGuard } from 'src/shared/infrastructure/adapters/nest/security/guards/access.guard';
// Import Pipes
import { UserIdPipe } from '../pipes/user-id.pipe';
// Custom decorators
import { Permissions } from 'src/shared/infrastructure/adapters/nest/security/decorators/permissions.decorator';
// Import Permissions
import { PERMISSIONS } from 'src/permissions/core/seeds/Permission.seeds';
// import uses case

// Import CommandBus and QueryBus
import { COMMAND_BUS, type CommandBus } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS, type QueryBus } from 'src/shared/app/bus/query-bus';
import { GetUserQuery } from 'src/users/app/get-user/get-user.query';
import { User } from 'src/users/core/entities/User';
import { GetUsersQuery } from 'src/users/app/get-users/get-users.query';
import { AuthUserCommand } from 'src/users/app/auth-user/auth-user.command';
import { AuthUserResponse } from 'src/users/app/auth-user/auth-user.response';
import { CreateUserCommand } from 'src/users/app/create-user/create-user.command';
import { DeleteUserCommand } from 'src/users/app/delete-user/delete-user.command';
import { UpdateUserCommand } from 'src/users/app/update-user/update-user.command';

@Controller('users')
export class UserController {
  constructor(
    @Inject(COMMAND_BUS) private readonly command: CommandBus,
    @Inject(QUERY_BUS) private readonly query: QueryBus,
  ) {}

  @Get()
  @Permissions(PERMISSIONS.READ_USERS.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async getAll(): Promise<GetUserDtoResponse[]> {
    const users = await this.query.execute<User[]>(new GetUsersQuery());
    return users.map((user) => new GetUserDtoResponse(user));
  }

  @Get(':id')
  @Permissions(PERMISSIONS.READ_USERS.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async getOne(
    @Param('id', UserIdPipe) id: string,
  ): Promise<GetUserDtoResponse> {
    const user = await this.query.execute<User>(new GetUserQuery(id));
    return new GetUserDtoResponse(user);
  }

  @Post('/login')
  async login(@Body() dto: AuthUserRequestDto): Promise<AuthUserDtoResponse> {
    const authUser = await this.command.execute<AuthUserResponse>(
      new AuthUserCommand(dto.username, dto.password),
    );
    return new AuthUserDtoResponse(authUser);
  }

  @Post('/create')
  @Permissions(PERMISSIONS.CREATE_USER.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async register(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserDtoResponse> {
    const user = await this.command.execute<User>(
      new CreateUserCommand(dto.username, dto.password, dto.email),
    );
    return new CreateUserDtoResponse(user);
  }

  @Put('update/:id')
  @Permissions(PERMISSIONS.UPDATE_USER.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async update(
    @Param('id', UserIdPipe) id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UpdateUserDtoResponse> {
    const user = await this.command.execute<User>(
      new UpdateUserCommand({
        id: id,
        data: {
          username: dto.username,
          email: dto.email,
          active: dto.active,
        },
      }),
    );
    return new UpdateUserDtoResponse(user);
  }

  @Delete('delete/:id')
  @Permissions(PERMISSIONS.DELETE_USER.name)
  @UseGuards(JwtAuthGuard, AccessGuard)
  async delete(
    @Param('id', UserIdPipe) id: string,
  ): Promise<GetUserDtoResponse> {
    const user = await this.command.execute<User>(
      new DeleteUserCommand({ id }),
    );
    return new GetUserDtoResponse(user);
  }
}
