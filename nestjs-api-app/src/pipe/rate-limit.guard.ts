import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { RATE_LIMIT_KEY } from './rate-limit.decorator';

@Injectable()
export class RateLimitGuard {
  private rateLimiters = new Map<string, RateLimiterMemory>();

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rateLimitOptions = this.reflector.getAllAndOverride(RATE_LIMIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rateLimitOptions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const key = request.ip;
    let rateLimiter: RateLimiterMemory;

    if (this.rateLimiters.has(key)) {
      rateLimiter = this.rateLimiters.get(key);
    } else {
      rateLimiter = new RateLimiterMemory(rateLimitOptions);
      this.rateLimiters.set(key, rateLimiter);
    }

    try {
      await rateLimiter.consume(key);
      return true;
    } catch (rejRes) {
      if (rejRes instanceof RateLimiterRes) {
        throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
      }
      return false;
    }
  }
}
