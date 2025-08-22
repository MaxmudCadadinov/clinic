import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Берём токен из заголовка Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN as string, // ⚠️ лучше вынести в .env
    });
  }

  async validate(payload: any) {
    // payload — это то, что ты зашил в токен при логине
    console.log('JWT payload перед validate:', payload);
    return { userId: payload.id, roleId: payload.role_id };
  }
}

// JWT payload перед validate: { id: 3, role_id: 1, iat: 1755779934, exp: 1755780834 }