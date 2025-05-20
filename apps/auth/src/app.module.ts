import { Module } from '@nestjs/common';
import { MongoModule } from '@app/mongo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {
  LoginHistory,
  LoginHistorySchema,
} from 'libs/common/schemas/login-history';
import { User, UserSchema } from 'apps/auth/src/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    MongoModule.connect('auth'),
    MongoModule.schema([
      { name: User.name, schema: UserSchema },
      { name: LoginHistory.name, schema: LoginHistorySchema },
    ]),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
