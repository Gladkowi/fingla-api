import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventResponseDto, EventResponsePaginationDto } from './dtos/reesponses.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { User } from '../user/decorators/user.decorator';

@ApiTags('Events')
@Controller()
export class EventController {
  constructor(
    private eventService: EventService,
  ) {
  }

  @Get('events')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponsePaginationDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getListEvents(
    @User('id') userId: number,
    @Query() paginate: PaginationDto,
  ): Promise<EventResponsePaginationDto> {
    return this.eventService.getEvents(userId, paginate);
  }

  @Get('event/:eventId')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  getEvent(
    @Param('eventId', ParseIntPipe) id: number,
  ): Promise<EventResponseDto> {
    return this.eventService.getEvent(id);
  }

  @Post('event')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  createEvent(
    @Body() body: CreateEventDto,
    @User('id') userId: number,
  ) {
    return this.eventService.createEvent(userId, body);
  }

  @Patch('event/:eventId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateEvent(
    @Param('eventId', ParseIntPipe) id: number,
    @Body() body: UpdateEventDto,
  ) {
    return this.eventService.updateEvent(id, body);
  }

  @Delete('event/:eventId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteEvent(
    @Param('eventId', ParseIntPipe) id: number,
  ) {
    return this.eventService.deleteEvent(id);
  }
}
