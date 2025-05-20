import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const USER_ROLES = ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'] as const;
export type UserRole = (typeof USER_ROLES)[number];

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: 'USER' })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });