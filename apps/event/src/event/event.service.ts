import { EventRepository } from 'apps/event/src/repositories/event.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventRequestDto } from './dtos/create-event-request.dto';
import { plainToInstance } from 'class-transformer';
import { EventResponseDto } from './dtos/event-response.dto';
import { Types } from 'mongoose';
import {
  EventListItemDto,
  EventListResponseDto,
} from './dtos/event-list-response.dto';
import { UpdateEventRequestDto } from './dtos/update-event-request.dto';
import { Event } from '../schemas/event.schema';
import { ConditionService } from '../condition/condition.service';
import { RewardService } from '../reward/reward.service';
import { RewardClaimHistoryListItemDto } from '../reward/dtos/reward-claim-history-list-response.dto';
import { RewardClaimHistoryRepository } from '../repositories/reward-claim-history.repository';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly conditionService: ConditionService,
    private readonly rewardService: RewardService,
    private readonly rewardClaimHistoryRepository: RewardClaimHistoryRepository,
  ) {}

  async createEvent(
    userId: string,
    dto: CreateEventRequestDto,
  ): Promise<EventResponseDto> {
    const exEvent = await this.eventRepository.findByCode(dto.code);

    if (exEvent) {
      throw new BadRequestException('동일한 code의 이벤트가 존재합니다.');
    }

    const data: Partial<Event> = {
      code: dto.code,
      title: dto.title,
      startAt: new Date(dto.startAt),
      endAt: new Date(dto.endAt),
      createdBy: new Types.ObjectId(userId),
      isActive: dto.isActive || false,
    };

    if (dto.description) {
      Object.assign(data, {
        description: dto.description,
      });
    }

    const event = await this.eventRepository.save(data);

    return plainToInstance(EventResponseDto, event);
  }

  async getEvents(page: number, limit: number): Promise<EventListResponseDto> {
    const total = await this.eventRepository.count({});
    const raw = await this.eventRepository.findAll(
      {},
      { startAt: -1 },
      page,
      limit,
    );
    const list = plainToInstance(
      EventListItemDto,
      raw.map((doc) => ({
        id: doc._id,
        code: doc.code,
        title: doc.title,
        startAt: doc.startAt,
        endAt: doc.endAt,
        isActive: doc.isActive,
      })),
    );

    return plainToInstance(EventListResponseDto, {
      list,
      total,
      page,
      limit,
    });
  }

  async getEvent(eventId: string): Promise<EventResponseDto> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('일치하는 이벤트를 찾지 못했습니다.');
    }

    return plainToInstance(EventResponseDto, event);
  }

  async updateEvent(
    eventId: string,
    userid: string,
    dto: UpdateEventRequestDto,
  ): Promise<EventResponseDto> {
    const updateQuery = {
      updateAt: new Types.ObjectId(userid),
    };

    if (dto.code) {
      Object.assign(updateQuery, { code: dto.code });
    }

    if (dto.title) {
      Object.assign(updateQuery, { title: dto.title });
    }

    if (dto.description) {
      Object.assign(updateQuery, { description: dto.description });
    }

    if (dto.startAt) {
      Object.assign(updateQuery, { startAt: dto.startAt });
    }

    if (dto.endAt) {
      Object.assign(updateQuery, { endAt: dto.endAt });
    }

    if (dto.isActive) {
      Object.assign(updateQuery, { isActive: dto.isActive });
    }

    if (dto.conditions) {
      Object.assign(updateQuery, { conditions: dto.conditions });
    }

    if (dto.rewards) {
      Object.assign(updateQuery, { rewards: dto.rewards });
    }

    const event = await this.eventRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(eventId) },
      updateQuery,
    );

    return plainToInstance(EventResponseDto, event);
  }

  async claimEventReward(id: string, userId: string) {
    const claimedHistories = await this.rewardClaimHistoryRepository.find({
      eventId: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
      success: true,
    });

    if (claimedHistories.length > 0) {
      throw new BadRequestException('이미 지급받은 보상 내역이 존재합니다.');
    }

    const event = await this.eventRepository.findById(id);

    if (!event || !event.isActive) {
      throw new NotFoundException('일치하는 이벤트를 찾지 못했습니다.');
    }

    const ok = await this.conditionService.validate(userId, event);
    console.log('ok', ok);
    if (!ok) {
      const histories = event.rewards.map((reward) => {
        return {
          userId: new Types.ObjectId(userId),
          eventId: new Types.ObjectId(event.id),
          rewardId: new Types.ObjectId(reward.id),
          success: false,
          errorMessage: '이벤트 조건을 만족하지 못했습니다.',
        };
      });

      await this.rewardService.createRewardClaimHistories(histories);

      throw new BadRequestException('이벤트 조건을 만족하지 못했습니다.');
    }

    const histories = await this.rewardService.grantRewards(
      userId,
      event.id,
      event.rewards,
    );

    return histories.map((history) =>
      plainToInstance(RewardClaimHistoryListItemDto, history),
    );
  }
}
