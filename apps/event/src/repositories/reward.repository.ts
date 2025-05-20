import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { BaseRepository } from '../../../../libs/mongo/src/mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from '../schemas/reward.schema';
import { Event } from '../schemas/event.schema';

@Injectable()
export class RewardRepository extends BaseRepository<Reward> {
  constructor(
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<Reward>,
  ) {
    super(rewardModel);
  }

  findAll(
    filter: FilterQuery<Reward> = {},
    sort: { [key: string]: SortOrder } = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<Reward[]> {
    const skip = (page - 1) * limit;
    return this.rewardModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('_id code title startAt endAt isActive createdAt')
      .lean()
      .exec();
  }

  findByCode(code: string): Promise<Reward | null> {
    return this.rewardModel.findOne({ code }).exec();
  }
}
