import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { BaseRepository } from '../../../../libs/mongo/src/mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { RewardClaimHistory } from 'apps/event/src/schemas/reward-claim-history.schema';

@Injectable()
export class RewardClaimHistoryRepository extends BaseRepository<RewardClaimHistory> {
  constructor(
    @InjectModel(RewardClaimHistory.name, 'event')
    private readonly rewardClaimHistoryModel: Model<RewardClaimHistory>,
  ) {
    super(rewardClaimHistoryModel);
  }

  saveAll(docs: Partial<RewardClaimHistory>[]) {
    return this.rewardClaimHistoryModel.insertMany(docs);
  }

  findAll(
    filter: FilterQuery<RewardClaimHistory> = {},
    sort: { [key: string]: SortOrder } = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<RewardClaimHistory[]> {
    const skip = (page - 1) * limit;
    return this.rewardClaimHistoryModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
