// src/auth/role.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from './auth.guard';

@Injectable()
export class RoleGuard extends JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return super.canActivate(context);
    }

    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });

        const foundedUser = await this.prisma.user.findUnique({
          where: { id: decodedToken?.sub },
        });

        const hasRequiredRole = requiredRoles.some(
          (role) => foundedUser?.role === role,
        );

        return hasRequiredRole && super.canActivate(context);
      } catch (error) {
        return false;
      }
    }

    return false;
  }
}
