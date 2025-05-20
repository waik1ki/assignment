import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from '../dtos/create-condition.dto';
import { ConditionValidator } from '../condition.type';
import { LoginHistoryRepository } from 'libs/common/repositories/login-history.repository';
import { differenceInDays } from 'date-fns';

@Injectable()
export class LoginConditionValidator implements ConditionValidator {
  constructor(
    private readonly loginHistoryRepository: LoginHistoryRepository,
  ) {}

  async isSatisfied(
    userId: string,
    condition: CreateConditionDto,
    startAt: Date,
    endAt: Date,
  ): Promise<boolean> {
    const count = await this.loginHistoryRepository.countDailyLogins(
      userId,
      startAt,
      endAt,
    );

    if (condition.calculation === 'COUNT') {
      return !(condition.count > count);
    }

    if (condition.calculation === 'PERCENTAGE') {
      const days = differenceInDays(endAt, startAt);

      return !(condition.count > (count / days) * 100);
    }

    return false;
  }
}
