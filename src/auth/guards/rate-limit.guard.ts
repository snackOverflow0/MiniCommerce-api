import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class RateLimitGuard
 implements CanActivate {

  constructor(private cacheService: CacheService) {}

  async canActivate(
    context: ExecutionContext
  ) {

    // Extract request object
    const request = 
      context.switchToHttp().getRequest()

    // User IP address
    const ip = request.ip

    // Redis Key
    const key = `login:${ip}`

    // Increment request counter
    const requests = 
      await this.cacheService.incr(key)

    // First request:
    // Set expiration
    if (requests === 1) {
      await this.cacheService.expire(
        key,
        60
      )
    }

    console.log(
      `IP ${ip}: ${requests} requests`
    )

    // Limit:
    // only 5 requests
    if (requests > 5) {
      throw new ForbiddenException(
        'Too many login attempts'
      )
    }

    return true
  }
 }