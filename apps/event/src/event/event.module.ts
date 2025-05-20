import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ConfigModule } from '@nestjs/config';
import { RewardModule } from '../reward/reward.module';
import { ConditionModule } from '../condition/condition.module';
import { EventRepository } from 'apps/event/src/repositories/event.repository';
import { RewardClaimHistoryRepository } from '../repositories/reward-claim-history.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RewardModule,
    ConditionModule,
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, RewardClaimHistoryRepository],
})
export class EventModule {}
