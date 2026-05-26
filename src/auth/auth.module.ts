import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [

    // Gives JWT features
    JwtModule.register({

      // Secret used to sign tokens
      secret: process.env.JWT_SECRET,

      // Access token expires in 15 minutes
      signOptions: {
        expiresIn: '15m',
      },
    }),

    PrismaModule
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy
  ],
})
export class AuthModule {}
