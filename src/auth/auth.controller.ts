import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  // Extract request body
  register(@Body() dto: RegisterDto) {
    // Pass to service
    return this.authService.register(dto);
  }

  // POST /auth/login
  @Post('login')
  // Extract request body
  login(@Body() dto: LoginDto) {
    // Pass to service
    return this.authService.login(dto);
  }

  // POST /auth/refresh
  @Post('refresh')
  // Extract refreshToken from body
  refresh(@Body('refreshToken') refreshToken: string) {
    // Pass to service
    return this.authService.refresh(refreshToken)
  }
}
