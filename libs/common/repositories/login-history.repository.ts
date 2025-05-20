import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { BaseRepository } from '../../mongo/src/mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { LoginHistory } from 'libs/common/schemas/login-history';

@Injectable()
export class LoginHistoryRepository extends BaseRepository<LoginHistory> {
  constructor(
    @InjectModel(LoginHistory.name)
    private readonly loginHistoryModel: Model<LoginHistory>,
  ) {
    super(loginHistoryModel);
  }

  async countDailyLogins(
    userId: string,
    startAt: Date,
    endAt: Date,
  ): Promise<number> {
    const result = await this.model
      .aggregate<{ total: number }>([
        {
          $match: {
            userId: new Types.ObjectId(userId),
            createdAt: { $gte: startAt, $lte: endAt },
          },
        },
        {
          $addFields: {
            dateStr: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
          },
        },
        {
          $group: {
            _id: '$dateStr',
            doc: { $first: '$$ROOT' },
          },
        },
        {
          $count: 'total',
        },
      ])
      .exec();

    return result.length > 0 ? result[0].total : 0;
  }
}
