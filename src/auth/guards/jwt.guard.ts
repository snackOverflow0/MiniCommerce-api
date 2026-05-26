import { Injectable } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

@Injectable()

// Uses JWT strategy automatically
export class JwtAuthGuard 
  extends AuthGuard('jwt') {}

  // Protect route using JWT strategy