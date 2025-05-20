import { Expose, Type } from 'class-transformer';
import { RewardResponseDto } from './reward-response.dto';
import { OmitType } from '@nestjs/mapped-types';

export class RewardListItemDto extends OmitType(RewardResponseDto, [
  'events',
]) {}

export class RewardListResponseDto {
  @Expose()
  @Type(() => RewardListItemDto)
  list: RewardListItemDto[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;
}
