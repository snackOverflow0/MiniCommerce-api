import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { RefreshDto } from './dto/refresh.dto';

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

  @UseGuards(RateLimitGuard)
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
  refresh(@Body() dto: RefreshDto) {
    // Pass to service
    return this.authService.refresh(dto.refreshToken)
  }
}
