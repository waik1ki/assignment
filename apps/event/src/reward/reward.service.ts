import { BadRequestException, Injectable } from '@nestjs/common';
import { RewardRepository } from 'apps/event/src/repositories/reward.repository';
import { plainToInstance } from 'class-transformer';
import { RewardResponseDto } from './dtos/reward-response.dto';
import { CreateRewardDto } from './dtos/create-reward-request.dto';
import { Reward } from '../schemas/reward.schema';
import { Types } from 'mongoose';
import { EventRepository } from 'apps/event/src/repositories/event.repository';
import {
  RewardListItemDto,
  RewardListResponseDto,
} from './dtos/reward-list-response.dto';
import { RewardClaimHistoryRepository } from 'apps/event/src/repositories/reward-claim-history.repository';
import { RewardClaimHistory } from 'apps/event/src/schemas/reward-claim-history.schema';
import {
  RewardClaimHistoryListItemDto,
  RewardClaimHistoryListResponseDto,
} from './dtos/reward-claim-history-list-response.dto';
import { UserRole } from 'apps/auth/src/schemas/user.schema';

@Injectable()
export class RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
    private readonly eventRepository: EventRepository,
    private readonly rewardClaimHistoryRepository: RewardClaimHistoryRepository,
  ) {}

  async createReward(userId: string, dto: CreateRewardDto) {
    const exReward = await this.rewardRepository.findByCode(dto.code);

    if (exReward) {
      throw new BadRequestException("동일한 code의 보상이 존재합니다.");
    }

    const data: Partial<Reward> = {
      code: dto.code,
      label: dto.label,
      params: dto.params,
      createdBy: new Types.ObjectId(userId),
    };

    if (dto.description) {
      Object.assign(data, {
        description: dto.description,
      });
    }

    const reward = await this.rewardRepository.save(data);

    return plainToInstance(RewardResponseDto, reward);
  }

  async getRewards(page: number, limit: number) {
    const total = await this.rewardRepository.count({});
    const raw = await this.rewardRepository.findAll(
      {},
      { startAt: -1 },
      page,
      limit,
    );

    const list = plainToInstance(
      RewardListItemDto,
      raw.map((doc) => ({
        id: doc._id,
        code: doc.code,
        label: doc.label,
        description: doc.description,
        params: doc.params,
      })),
    );

    return plainToInstance(RewardListResponseDto, {
      list,
      total,
      page,
      limit,
    });
  }

  async getReward(rewardId: string) {
    const reward = await this.rewardRepository.findById(rewardId);
    const events = await this.eventRepository.find({ rewards: rewardId });

    return plainToInstance(RewardResponseDto, {
      id: reward?._id,
      code: reward?.code,
      label: reward?.label,
      params: reward?.params,
      createdBy: reward?.createdBy,
      events: events.map((event) => {
        return {
          id: event._id,
          code: event.code,
          title: event.title,
        };
      }),
    });
  }

  async grantRewards(
    userId: string,
    eventId: string,
    rewards: Types.ObjectId[],
  ) {
    // 실제 유저에게 reward의 재화, 쿠폰, 아이템, .. 등의 미리 정의되어있는 아이템을 지급하는 로직
    // 이 후 지급 여부에 대한 내역 적재

    const rewardHisories = rewards.map((reward) => {
      const data: Partial<RewardClaimHistory> = {
        userId: new Types.ObjectId(userId),
        eventId: new Types.ObjectId(eventId),
        rewardId: new Types.ObjectId(reward.id),
        success: true,
      };

      return data;
    });

    return this.createRewardClaimHistories(rewardHisories);
  }

  async createRewardClaimHistories(histories: Partial<RewardClaimHistory>[]) {
    return this.rewardClaimHistoryRepository.saveAll(histories);
  }

  async getRewardClaimHistories(page: number, limit: number, userId: string, userRole: UserRole) {
    const filterQuery = {};

    if (userRole === 'USER') {
      Object.assign(filterQuery, {
        userId: new Types.ObjectId(userId),
      });
    }

    const total = await this.rewardClaimHistoryRepository.count(filterQuery);
    const raw = await this.rewardClaimHistoryRepository.findAll(
      filterQuery,
      { startAt: -1 },
      page,
      limit,
    );

    const list = plainToInstance(
      RewardClaimHistoryListItemDto,
      raw.map((doc) => ({
        eventId: doc.eventId,
        userId: doc.userId,
        rewardId: doc.rewardId,
        success: doc.success,
        errorMessage: doc.errorMessage,
      })),
    );

    return plainToInstance(RewardClaimHistoryListResponseDto, {
      list,
      total,
      page,
      limit,
    });
  }
}
