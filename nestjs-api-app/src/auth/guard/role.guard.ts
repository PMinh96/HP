import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardx implements CanActivate {
    constructor(private roles: string[]){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user.role);
    return this.roles.includes(request.user.role.toLowerCase());
    //return false
  }
}
