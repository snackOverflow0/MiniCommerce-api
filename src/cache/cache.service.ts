import { 
  Injectable,

  // Runs when module starts
  OnModuleInit
} from '@nestjs/common';

import { createClient } from 'redis';

@Injectable()
export class CacheService
  implements OnModuleInit {

  // Redis client
  private client

  async onModuleInit() {
      
    // Creates redis connection
    this.client = createClient({
      url: 'redis://localhost:6379',
    })

    // Error handling
    this.client.on(
      'error', (err) => {
        console.log('Redis Error', err)
      }
    )

    // Connect to Redis
    await this.client.connect()
    console.log('Redis Connected')

  }

  // GET CACHE VALUE
  async get(key: string) {
    return this.client.get(key)
  }

  // SET CACHE VALUE
  async set(
    key: string,
    value: string
  ) {
    return this.client.set(
      key,
      value
    )
  }

  // DELETE CACHE VALUE
  async del(key: string) {
    return this.client.del(key)
  }

  // INCREMENT NUMBER
  async incr(key: string) {
    return this.client.incr(key)
  }

  // SET EXPIRATION TIM
  async expire(
    key: string,
    seconds: number
  ) {
    return this.client.expire(
      key,
      seconds
    )
  }
}
