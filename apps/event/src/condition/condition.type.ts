export const CONDITION_TYPES = ['LOGIN', 'INVITE', 'QUEST'] as const;
export type ConditionType = (typeof CONDITION_TYPES)[number];

export const CONDITION_CALCULATION_TYPES = ['COUNT', 'PERCENTAGE'] as const;
export type ConditionCalculationType =
  (typeof CONDITION_CALCULATION_TYPES)[number];

export interface ConditionValidator {
  isSatisfied(
    userId: string,
    condition: {
      type: ConditionType;
      count: number;
      calculation: ConditionCalculationType;
    },
    startAt: Date,
    endAt: Date,
  );
}
