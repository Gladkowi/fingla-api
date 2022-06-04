import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventResponseDto, EventResponsePaginationDto } from './dtos/reesponses.dto';
import { UserEntity } from '../user/user.entity';
import { CategoryEntity } from '../category/category.entity';
import { CategoryTypeEnum } from '../category/enums/category-type.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private event: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
    private connection: Connection,
  ) {
  }

  async getEvents(
    userId: number,
    paginate: PaginationDto,
  ): Promise<EventResponsePaginationDto> {
    const [items, count] = await this.event.findAndCount({
      take: paginate.limit,
      skip: paginate.offset,
      relations: ['category'],
      order: {
        date: 'DESC',
      },
      where: {
        category: {
          userId,
        },
      },
    });

    return {
      items,
      count,
    };
  }

  getEvent(id: number): Promise<EventResponseDto> {
    return this.event.findOneOrFail(id);
  }

  async createEvent(
    userId: number,
    body: CreateEventDto,
  ) {
    const transactRunner = this.connection.createQueryRunner();
    await transactRunner.startTransaction();
    try {
      const event = await transactRunner.manager.save(EventEntity, body);
      const category = await transactRunner.manager.findOne(CategoryEntity, { id: event.categoryId });
      if (!category) {
        throw new InternalServerErrorException();
      }
      const user = await transactRunner.manager.findOne(UserEntity, { id: userId });
      if (!user) {
        throw new InternalServerErrorException();
      }
      await transactRunner.manager
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        account: category.type === CategoryTypeEnum.EXPENSE ? +user.account - +body.sum : +user.account + +body.sum,
      })
      .where({ id: userId })
      .execute();
      await transactRunner.commitTransaction();
      return event;
    } catch (err) {
      console.error(err);
      await transactRunner.rollbackTransaction();
    } finally {
      await transactRunner.release();
    }
  }

  async updateEvent(id: number, body: UpdateEventDto) {
    await this.event.update(id, body);
  }

  async deleteEvent(id: number) {
    await this.event.delete(id);
  }


}
