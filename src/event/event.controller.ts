import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller()
export class EventController {
  constructor(
    private eventService: EventService,
  ) {
  }

  @Post('event')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createEvent() {

  }

  @Get('events')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getListEvents() {

  }

  @Get('event/:eventId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getEvent(
    @Param('eventId', ParseIntPipe) id: number
  ) {

  }

  @Patch('event/:eventId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateEvent(
    @Param('eventId', ParseIntPipe) id: number
  ) {

  }

  @Delete('event/:eventId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteEvent(
    @Param('eventId', ParseIntPipe) id: number
  ) {

  }
}
