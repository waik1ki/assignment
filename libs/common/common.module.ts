import { Module } from '@nestjs/common';
import { MongoModule } from '@app/mongo';
import {
  LoginHistory,
  LoginHistorySchema,
} from 'libs/common/schemas/login-history';
import { ConfigModule } from '@nestjs/config';
import { CommonService } from './common.service';
import { LoginHistoryRepository } from './repositories/login-history.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule.connect('common'),
    MongoModule.schema(
      [{ name: LoginHistory.name, schema: LoginHistorySchema }],
      'common',
    ),
  ],
  exports: [CommonService],
  providers: [CommonService, LoginHistoryRepository],
})
export class CommonModule {}
