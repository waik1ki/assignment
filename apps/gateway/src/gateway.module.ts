import { Module } from '@nestjs/common';
import { JwtModule } from '../../../libs/jwt/src';
import { RolesGuard } from './guards/roles.guard';
import { EventController } from './event-proxy.controller';
import { JwtAuthGuard } from 'apps/gateway/src/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayService } from './gateway.service';
import { AuthController } from './auth-proxy.controller';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.forRootAsync(),
    HttpModule,
    CacheModule,
  ],
  controllers: [AuthController, EventController],
  providers: [
    GatewayService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [GatewayService],
})
export class GatewayModule {}
