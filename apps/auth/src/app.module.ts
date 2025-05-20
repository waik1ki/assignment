import { Module } from '@nestjs/common';
import { MongoModule } from '@app/mongo';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User, UserSchema } from 'apps/auth/src/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    MongoModule.connect('auth'),
    MongoModule.schema([{ name: User.name, schema: UserSchema }], 'auth'),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
