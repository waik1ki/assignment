import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardParamDto } from 'apps/event/src/reward/dtos/reward-param.dto';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ collection: 'rewards', timestamps: true })
export class Reward extends Document {
  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Object, default: {} })
  params: RewardParamDto;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}
export const RewardSchema = SchemaFactory.createForClass(Reward);
