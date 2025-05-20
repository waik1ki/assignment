import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '@app/mongo';
import { Event, EventSchema } from 'apps/event/src/schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardModule } from './reward/reward.module';
import { ConditionModule } from './condition/condition.module';
import { EventModule } from './event/event.module';
import {
  RewardClaimHistory,
  RewardClaimHistorySchema,
} from 'apps/event/src/schemas/reward-claim-history.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    MongoModule.connect('event'),
    MongoModule.schema(
      [
        { name: Event.name, schema: EventSchema },
        { name: Reward.name, schema: RewardSchema },
        { name: RewardClaimHistory.name, schema: RewardClaimHistorySchema },
      ],
      'event',
    ),
    EventModule,
    RewardModule,
    ConditionModule,
  ],
})
export class AppModule {}
