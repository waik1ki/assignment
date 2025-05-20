import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventRequestDto } from './dtos/create-event-request.dto';
import { EventListResponseDto } from './dtos/event-list-response.dto';
import { EventResponseDto } from './dtos/event-response.dto';
import { UpdateEventRequestDto } from './dtos/update-event-request.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // 이벤트 생성
  @Post()
  createEvent(
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateEventRequestDto,
  ): Promise<EventResponseDto> {
    return this.eventService.createEvent(userId, dto);
  }

  // 이벤트 목록 조회
  @Get()
  getEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<EventListResponseDto> {
    return this.eventService.getEvents(Number(page), Number(limit));
  }

  // 이벤트 상세 조회
  @Get(':id')
  getEvent(@Param('id') id: string): Promise<EventResponseDto> {
    return this.eventService.getEvent(id);
  }

  // 이벤트 업데이트
  @Patch(':id')
  updateEvent(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
    @Body() dto: UpdateEventRequestDto,
  ): Promise<EventResponseDto> {
    return this.eventService.updateEvent(id, userId, dto);
  }

  // 이벤트 참여 보상 요청
  @Post(':id/claim')
  claimEventReward(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ) {
    return this.eventService.claimEventReward(id, userId);
  }
}
