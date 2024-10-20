import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';



export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user;
    //console.log(request);
    return key? user?.[key] : user
  },
);

