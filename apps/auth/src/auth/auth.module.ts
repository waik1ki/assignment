import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@app/jwt';
import { UserRepository } from 'apps/auth/src/repositories/user.repository';
import { LoginHistoryRepository } from 'libs/common/repositories/login-history.repository';
import { CommonModule } from '../../../../libs/common/common.module';

@Module({
  imports: [JwtModule.forRootAsync(), CommonModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LoginHistoryRepository],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
