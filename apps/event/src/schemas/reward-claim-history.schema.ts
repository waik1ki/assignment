import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'reward_claim_histories', timestamps: true })
export class RewardClaimHistory extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Event',
    required: true,
    index: true,
  })
  eventId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Reward',
    required: true,
    index: true,
  })
  rewardId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  success: boolean;

  @Prop({ type: String })
  errorMessage?: string;
}

export const RewardClaimHistorySchema =
  SchemaFactory.createForClass(RewardClaimHistory);
RewardClaimHistorySchema.index({ eventId: 1 });
RewardClaimHistorySchema.index({ rewardId: 1 });
RewardClaimHistorySchema.index({ userId: 1 });
