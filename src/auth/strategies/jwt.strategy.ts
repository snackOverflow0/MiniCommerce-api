import { Injectable } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy 
  extends PassportStrategy(Strategy) {
    constructor() {
      super({

        // Extract token from :
        // Authorization: Bearer TOKEN
        jwtFromRequest: 
          ExtractJwt.fromAuthHeaderAsBearerToken(),

        ignoreExpiration: false,

        secretOrKey:
          process.env.JWT_SECRET as string
      })
    }

    
    // Runs automatically after token validation
    async validate(payload: any) {
      
      // Whatever is returned here
      // becomes:
      // req.user
      return {
        userId: payload.sub,
        email: payload.email
      }
    }
}