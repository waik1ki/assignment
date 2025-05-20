import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RewardResponseDto } from './dtos/reward-response.dto';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dtos/create-reward-request.dto';
import { RewardListResponseDto } from './dtos/reward-list-response.dto';
import { RewardClaimHistoryListResponseDto } from './dtos/reward-claim-history-list-response.dto';
import { UserRole } from 'apps/auth/src/schemas/user.schema';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  // 보상 등록
  @Post()
  createReward(
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateRewardDto,
  ): Promise<RewardResponseDto> {
    return this.rewardService.createReward(userId, dto);
  }

  // 보상 목록 조회
  @Get()
  getRewards(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<RewardListResponseDto> {
    return this.rewardService.getRewards(Number(page), Number(limit));
  }

  // 보상 지급 목록 조회
  @Get('history')
  getRewardClaimHistories(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') userRole: UserRole,
  ): Promise<RewardClaimHistoryListResponseDto> {
    return this.rewardService.getRewardClaimHistories(
      Number(page),
      Number(limit),
      userId,
      userRole
    );
  }

  // 보상 상세 조회
  @Get(':rewardId')
  getReward(@Param('rewardId') rewardId: string): Promise<RewardResponseDto> {
    return this.rewardService.getReward(rewardId);
  }
}
