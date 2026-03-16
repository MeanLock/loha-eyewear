import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AccountRole } from '../../database/enums/account-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<AccountRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Nếu không có mác @Roles() thì cho phép truy cập
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Nếu token trả về roles mà trùng khớp yêu cầu
        return requiredRoles.some((role) => user?.role === role);
    }
}
