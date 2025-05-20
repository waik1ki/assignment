import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  RootFilterQuery,
} from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  count(filter: RootFilterQuery<T> = {}) {
    return this.model.countDocuments(filter);
  }

  save(data: Partial<T>): Promise<T> {
    return new this.model(data).save();
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  deleteOne(filter: FilterQuery<T>): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne(filter).exec();
  }
}
