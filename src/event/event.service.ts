import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventResponseDto, EventResponsePaginationDto } from './dtos/reesponses.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity) private event: Repository<EventEntity>
  ) { }

  async getEvents(
    userId: number,
    paginate: PaginationDto
  ): Promise<EventResponsePaginationDto> {
    const [items, count] = await this.event.findAndCount({
      take: paginate.limit,
      skip: paginate.offset,
      relations: ['category'],
      order: {
        date: 'DESC'
      },
      where: {
        category: {
          userId
        }
      }
    });

    return {
      items,
      count
    };
  }

  getEvent(id: number): Promise<EventResponseDto> {
    return this.event.findOneOrFail(id);
  }

  createEvent(body: CreateEventDto): Promise<EventResponseDto> {
    return this.event.save(body);
  }

  async updateEvent(id: number, body: UpdateEventDto) {
    await this.event.update(id, body);
  }

  async deleteEvent(id: number) {
    await this.event.delete(id);
  }


}
