import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cache: Cache,
  ) {}

  private makeKey(userId: string, endpoint: string) {
    return `idem:${userId}:${endpoint}`;
  }

  async checkAndSet(userId: string, endpoint: string): Promise<boolean> {
    const key = this.makeKey(userId, endpoint);
    const exists = await this.cache.get(key);
    if (exists) return false;
    await this.cache.set(key, true);
    return true;
  }

  async clear(userId: string, endpoint: string): Promise<void> {
    const key = this.makeKey(userId, endpoint);
    await this.cache.del(key);
  }
}
