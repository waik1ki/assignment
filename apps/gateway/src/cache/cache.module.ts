import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      ttl: 60,
      max: 1000,
    }),
  ],
  providers: [CacheService, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
