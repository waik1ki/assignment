import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class RewardParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @Min(1)
  count: number;
}
