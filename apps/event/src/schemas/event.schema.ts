import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CONDITION_CALCULATION_TYPES,
  CONDITION_TYPES,
  ConditionCalculationType,
  ConditionType,
} from 'apps/event/src/condition/condition.type';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'events', timestamps: true })
export class Event extends Document {
  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Date, required: true })
  startAt: Date;

  @Prop({ type: Date, required: true })
  endAt: Date;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({
    type: [
      {
        type: {
          type: String,
          enum: {
            values: CONDITION_TYPES,
            message: '지원되지 않는 조건 타입입니다. 허용: ' + CONDITION_TYPES.join(', '),
          },
          required: [true, '조건 타입(type) 필드는 반드시 필요합니다.'],
        },
        count: {
          type: Number,
          required: [true, '조건 개수(count) 필드는 반드시 필요합니다.'],
          min: [1, 'count는 최소 1 이상이어야 합니다.'],
        },
        calculation: {
          type: String,
          enum: {
            values: CONDITION_CALCULATION_TYPES,
            message: '계산 방식(calculation)은 COUNT 또는 PERCENTAGE만 허용됩니다.',
          },
          required: [true, '계산 방식(calculation) 필드는 반드시 필요합니다.'],
        },
      },
    ],
    default: [],
  })
  conditions: Array<{
    type: ConditionType;
    count: number;
    calculation: ConditionCalculationType;
  }>;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Reward' }],
    default: [],
  })
  rewards: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;
}
export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ code: 1 });
EventSchema.index({ startAt: 1, endAt: 1, isActive: 1 });
EventSchema.index({ rewards: 1 });
