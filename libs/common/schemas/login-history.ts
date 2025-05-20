import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'login_histories', timestamps: true })
export class LoginHistory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  success: boolean;
}

export const LoginHistorySchema = SchemaFactory.createForClass(LoginHistory);
