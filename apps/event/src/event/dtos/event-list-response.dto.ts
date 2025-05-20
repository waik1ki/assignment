import { PickType } from '@nestjs/mapped-types';
import { EventResponseDto } from './event-response.dto';

import { Expose, Type } from 'class-transformer';

export class EventListItemDto extends PickType(EventResponseDto, [
  'id',
  'code',
  'title',
  'startAt',
  'endAt',
  'isActive',
  'createdAt',
]) {}

export class EventListResponseDto {
  @Expose()
  @Type(() => EventListItemDto)
  list: EventListItemDto[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;
}
