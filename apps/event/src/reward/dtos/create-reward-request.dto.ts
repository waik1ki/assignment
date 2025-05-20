import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { RewardParamDto } from './reward-param.dto';

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsObject()
  @Type(() => Object)
  params: RewardParamDto;
}
