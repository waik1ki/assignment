import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from '../dtos/create-condition.dto';
import { ConditionValidator } from '../condition.type';
import { differenceInDays } from 'date-fns';
import { CommonService } from '../../../../../libs/common/common.service';

@Injectable()
export class LoginConditionValidator implements ConditionValidator {
  constructor(private readonly commonService: CommonService) {}

  async isSatisfied(
    userId: string,
    condition: CreateConditionDto,
    startAt: Date,
    endAt: Date,
  ): Promise<boolean> {
    const count = await this.commonService.getDaliyLoginCount(
      userId,
      startAt,
      endAt,
    );

    if (count === 0) {
      return false;
    }

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
