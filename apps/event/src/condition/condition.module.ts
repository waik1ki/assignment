import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { LoginConditionValidator } from './validators/login-condition.validator';
import { LoginHistoryRepository } from 'libs/common/repositories/login-history.repository';
import { CommonModule } from '../../../../libs/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [
    ConditionService,
    LoginConditionValidator,
    LoginHistoryRepository,
  ],
  exports: [ConditionModule, ConditionService],
})
export class ConditionModule {}
