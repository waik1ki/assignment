import { Controller, Req, Post, Patch, Get } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'apps/gateway/src/decorators/public.decorator';
import { GatewayService } from './gateway.service';
import { Roles } from './decorators/roles.decorator';

@Controller()
export class EventController {
  constructor(private readonly gatewayService: GatewayService) {}

  // 이벤트 등록
  @Roles('OPERATOR', 'ADMIN')
  @Post('events')
  proxyCreateEvent(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 이벤트 목록 조회
  @Public()
  @Get('events')
  proxyGetEvents(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 이벤트 상세 조회
  @Public()
  @Get('events/:id')
  proxyGetEvent(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 이벤트 수정
  @Roles('OPERATOR', 'ADMIN')
  @Patch('events/:id')
  proxyUpdateEvent(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 이벤트 참여 보상 요청
  @Roles('USER', 'ADMIN')
  @Post('events/:id/claim')
  proxyClaimEventReward(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 보상 등록
  @Roles('OPERATOR', 'ADMIN')
  @Post('rewards')
  proxyCreateReward(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 보상 목록 조회
  @Roles('OPERATOR', 'ADMIN')
  @Get('rewards')
  proxyGetRewards(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 보상 지급 목록 조회
  @Get('rewards/history')
  proxyGetRewardClaimHistories(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }

  // 보상 상세 조회
  @Roles('OPERATOR', 'ADMIN')
  @Get('rewards/:id')
  proxyGetReward(@Req() req: Request) {
    return this.gatewayService.proxy('EVENT', req);
  }
}
