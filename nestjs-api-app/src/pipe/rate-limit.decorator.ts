import { SetMetadata } from '@nestjs/common';
import { RateLimiterOptions } from 'nestjs-rate-limiter';

export const RATE_LIMIT_KEY = 'rateLimit';

export const RateLimit = (options: RateLimiterOptions) => SetMetadata(RATE_LIMIT_KEY, options);
