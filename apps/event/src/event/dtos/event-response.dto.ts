import { Expose, Type } from 'class-transformer';
import { RewardResponseDto } from '../../reward/dtos/reward-response.dto';
import { CreateConditionDto } from '../../condition/dtos/create-condition.dto';

export class EventResponseDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  startAt: Date;

  @Expose()
  endAt: Date;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => CreateConditionDto)
  conditions: CreateConditionDto[];

  @Expose()
  @Type(() => RewardResponseDto)
  rewards: RewardResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdBy?: string;
}
