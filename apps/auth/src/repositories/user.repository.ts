import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../../libs/mongo/src/mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/auth/src/schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
