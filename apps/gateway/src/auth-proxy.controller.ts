import { Controller, Req, Post, Patch } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'apps/gateway/src/decorators/public.decorator';
import { GatewayService } from './gateway.service';
import { Roles } from './decorators/roles.decorator';

@Controller()
export class AuthController {
  constructor(private readonly gatewayService: GatewayService) {}

  // 로그인
  @Public()
  @Post('login')
  proxyLogin(@Req() req: Request) {
    return this.gatewayService.proxy('AUTH', req);
  }

  // 유저 등록
  @Public()
  @Post('users')
  proxyJoin(@Req() req: Request) {
    return this.gatewayService.proxy('AUTH', req);
  }

  // 유저 수정
  @Roles('ADMIN')
  @Patch('users/:id')
  proxyUpdate(@Req() req: Request) {
    return this.gatewayService.proxy('AUTH', req);
  }
}
