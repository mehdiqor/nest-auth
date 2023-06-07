import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      if (user.role === RolesEnum.SUPERUSER) {
        return true;
        // Superuser can access everything
      }

      const hasRole = () =>
        requiredRoles.some((role) => role === user.role);

      switch (user.role) {
        case RolesEnum.USER:
          if (hasRole()) return true;
          break;
        case RolesEnum.ARTIST:
          if (
            hasRole() ||
            requiredRoles.includes(RolesEnum.USER)
          )
            return true;
          break;
        case RolesEnum.DIRECTOR:
          if (
            hasRole() ||
            requiredRoles.includes(RolesEnum.USER)
          )
            return true;
          break;
        case RolesEnum.ADMIN:
          if (
            hasRole() ||
            requiredRoles.includes(RolesEnum.ARTIST) ||
            requiredRoles.includes(RolesEnum.DIRECTOR) ||
            requiredRoles.includes(RolesEnum.USER)
          )
            return true;
          break;
      }
    }

    throw new ForbiddenException(
      "you don't have permission to access this part",
    );
  }
}
