import { Expose, Type } from 'class-transformer';

export class RewardClaimHistoryListItemDto {
  @Expose()
  eventId: string;

  @Expose()
  rewardId: string;

  @Expose()
  userId: string;

  @Expose()
  success: boolean;

  @Expose()
  errorMessage?: string;
}

export class RewardClaimHistoryListResponseDto {
  @Expose()
  @Type(() => RewardClaimHistoryListItemDto)
  list: RewardClaimHistoryListItemDto[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;
}
