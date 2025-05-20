import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { BaseRepository } from '../../../../libs/mongo/src/mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'apps/event/src/schemas/event.schema';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(
    @InjectModel(Event.name, 'event')
    private readonly eventModel: Model<Event>,
  ) {
    super(eventModel);
  }

  async findAll(
    filter: FilterQuery<Event> = {},
    sort: { [key: string]: SortOrder } = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<Event[]> {
    const skip: number = (page - 1) * limit;
    return this.eventModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('_id code title startAt endAt isActive createdAt')
      .lean()
      .exec();
  }

  findByCode(code: string): Promise<Event | null> {
    return this.eventModel.findOne({ code }).exec();
  }
}
