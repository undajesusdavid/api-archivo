import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/shared/security/decorators/permissions.decorator';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const permissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user?.permissions.includes('*')) {
      return true;
    }

    if (!permissions || permissions.length === 0) {
      return true;
    }

    const hasPermission = () =>
      user.permissions.some((permission: string) =>
        permissions.includes(permission),
      );

    if (!hasPermission()) {
      throw new UnauthorizedException(
        'El usuario no posee el permiso requerido',
      );
    }

    return true;
  }
}
