import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IJwtServicePayload } from 'src/domain/services/jwt.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const isPublicRoute =
      request.originalUrl === "/healthCheck" ||
      request.originalUrl === "/auth/login";

    if (isPublicRoute) {
      return true;
    }

    let jwtObject: IJwtServicePayload;
    try {
      jwtObject = request.user;
    } catch (error) {
      return false;
    }

    const permissions = jwtObject.permissions;
    const requiredPermissions = this.reflector.get<string>('permission', context.getHandler());
    const hasPermission = permissions.some(permission => permission === requiredPermissions);

    if (!hasPermission && requiredPermissions.length > 0) {
      throw new UnauthorizedException(`Usuário não possui a permissão: ${requiredPermissions}`);
    }

    return hasPermission;
  }
}
