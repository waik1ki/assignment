import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsISO8601,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateConditionDto } from '../../condition/dtos/create-condition.dto';

export class CreateEventRequestDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsISO8601()
  startAt: string;

  @IsISO8601()
  endAt: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConditionDto)
  conditions: CreateConditionDto[];

  @IsArray()
  @Type(() => String)
  rewards: string[];
}
