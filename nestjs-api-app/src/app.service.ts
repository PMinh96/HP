import { Injectable } from '@nestjs/common';
import { ApiResponse } from './commons/api-response';

@Injectable()
export class AppService {
  getHello() {
    return ApiResponse.success('Hello ❤️');
  }
}
