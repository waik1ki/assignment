import { IsEnum, IsInt, Min } from 'class-validator';
import {
  CONDITION_CALCULATION_TYPES,
  CONDITION_TYPES,
  ConditionCalculationType,
  ConditionType,
} from '../condition.type';

export class CreateConditionDto {
  @IsEnum(CONDITION_TYPES, {
    message: `지원되지 않는 조건 타입입니다. 허용: ${CONDITION_TYPES.join(', ')}`,
  })
  type: ConditionType;

  @IsInt()
  @Min(1)
  count: number;

  @IsEnum(CONDITION_CALCULATION_TYPES, {
    message: `지원되지 않는 계산 타입입니다. 허용: ${CONDITION_CALCULATION_TYPES.join(', ')}`
  })
  calculation: ConditionCalculationType;
}
