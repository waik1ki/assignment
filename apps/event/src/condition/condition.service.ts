import { Injectable } from '@nestjs/common';
import { ConditionType, ConditionValidator } from './condition.type';
import { Event } from 'apps/event/src/schemas/event.schema';
import { LoginConditionValidator } from './validators/login-condition.validator';

@Injectable()
export class ConditionService {
  private readonly conditionValidator = new Map<
    ConditionType,
    ConditionValidator
  >();

  constructor(
    private readonly loginConditionValidator: LoginConditionValidator,
    // private readonly inviteConditionValidator: InviteConditionValidator,
    // private readonly questConditionValidator: QuestConditionValidator,
  ) {
    this.conditionValidator.set('LOGIN', this.loginConditionValidator);
    // this.conditionValidator.set('INVITE', this.inviteConditionValidator);
    // this.conditionValidator.set('QUEST', this.questConditionValidator);
  }

  async validate(userId: string, event: Event): Promise<boolean> {
    for (const condition of event.conditions) {
      const validator = this.conditionValidator.get(
        condition.type,
      ) as ConditionValidator;

      const isSatisfied = await validator.isSatisfied(
        userId,
        condition,
        event.startAt,
        event.endAt,
      );

      if (!isSatisfied) {
        return false;
      }
    }

    return true;
  }
}
