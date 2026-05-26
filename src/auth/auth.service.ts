import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    // Database Access
    private prisma: PrismaService,
    // Jwt Features
    private jwtService: JwtService
  ) {}

  // REGISTER
  async register (
    dto: RegisterDto
  ) {

    // Check if email already exists
    const existingUser =  
      await this.prisma.user.findUnique({
        where: { email: dto.email }
      })

    // Prevent duplicate account
    if (existingUser) {
      throw new ConflictException(
        'Email already exists'
      )
    }

    // Hash password
    // NEVER store raw password
    const hashedPassword =
      await bcrypt.hash(
        dto.password,
        10
      )

    // Create User in Database
    const user =  
      await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword
        }
      })

    return {
      message: 'Registered successfully',
      user
    }
  }

  // LOGIN
  async login(
    dto: LoginDto
  ) {
    
    // Find user by email
    const user =  
      await this.prisma.user.findUnique({
        where: { email: dto.email }
      })

    // If user doesn't exist
    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials'
      )
    }

    // Compare password with hashed password
    const isMatch = 
      await bcrypt.compare(
        dto.password,
        user.password
      )

    // Wrong password
    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials'
      )
    }

    // Create access token
    const accessToken = 
      this.jwtService.sign({
        sub: user.id,
        email: user.email
      })

    // Create refresh token
    const refreshToken =
      this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' }
      )

    // Save refresh token in database
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken
      }
    })

    return {
      accessToken,
      refreshToken
    }
  }

  // REFRESH TOKEN
  async refresh (
    refreshToken: string
  ) {
    
    // Find user with refresh token
    const user =
      await this.prisma.user.findFirst({
        where: {
          refreshToken
        }
      })

    if (!user) {
      throw new UnauthorizedException(
        'Invalid refresh token'
      )
    }

    // Create new access token
    const newAccessToken = 
      this.jwtService.sign({
        sub: user.id,
        email: user.email
      })

    return {
      accessToken: newAccessToken
    }
  }
}
