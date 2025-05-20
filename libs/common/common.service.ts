import { Injectable } from '@nestjs/common';
import { LoginHistoryRepository } from './repositories/login-history.repository';
import { Types } from 'mongoose';

@Injectable()
export class CommonService {
  constructor(
    private readonly loginHistoryRepository: LoginHistoryRepository,
  ) {}

  async recordLogin(userId: string, success: boolean) {
    return this.loginHistoryRepository.save({
      userId: new Types.ObjectId(userId),
      success,
    });
  }

  async getDaliyLoginCount(userId: string, startAt: Date, endAt: Date) {
    return this.loginHistoryRepository.countDailyLogins(userId, startAt, endAt);
  }
}
