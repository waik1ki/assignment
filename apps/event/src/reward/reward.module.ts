import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { RewardRepository } from 'apps/event/src/repositories/reward.repository';
import { EventRepository } from 'apps/event/src/repositories/event.repository';
import { RewardClaimHistoryRepository } from 'apps/event/src/repositories/reward-claim-history.repository';

@Module({
  providers: [
    RewardService,
    RewardRepository,
    RewardClaimHistoryRepository,
    EventRepository,
  ],
  controllers: [RewardController],
  exports: [RewardModule, RewardService],
})
export class RewardModule {}
