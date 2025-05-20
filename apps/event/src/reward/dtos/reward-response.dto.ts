import { Expose } from 'class-transformer';
import { RewardParamDto } from './reward-param.dto';
import { EventResponseDto } from '../../event/dtos/event-response.dto';

export class RewardResponseDto {
  @Expose()
  code: string;

  @Expose()
  label: string;

  @Expose()
  description?: string;

  @Expose()
  params: RewardParamDto;

  @Expose()
  events?: Pick<EventResponseDto, 'id' | 'code' | 'title'>[];

  @Expose()
  createdBy?: string;
}
