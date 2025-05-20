import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  sign(payload: { sub: string; role: string }): string {
    return this.jwt.sign(payload);
  }

  verify<T extends object = any>(token: string): T {
    return this.jwt.verify<T>(token);
  }
}
