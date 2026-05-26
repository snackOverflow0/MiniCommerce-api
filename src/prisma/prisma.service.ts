import {
  Injectable,

  // Life cycle hook
  // Runs when module initializes
  OnModuleInit
 } from '@nestjs/common';

import { PrismaClient } from '@prisma/client'

@Injectable()

// extends PrismaClient
// so NestJs can user Prisma methods
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
  {

    // Runs automatically
    async onModuleInit() {
        
      // Connect backend to the database
      await this.$connect()

      console.log(
        'PostgreSQL Connected'
      )
    }
  }
