import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'apps/auth/src/repositories/user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}
