import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalEntity } from './goal.entity';
import { GoalResponseDto, GoalResponsePaginationDto } from './dtos/responses.dto';
import { CreateGoalDto } from './dtos/create-goal.dto';
import { UpdateGoalDto } from './dtos/update-goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(GoalEntity)
    private goal: Repository<GoalEntity>,
  ) { }

  async getListGoal(
    userId: number,
    paginate: PaginationDto,
  ): Promise<GoalResponsePaginationDto> {
    const [items, count] = await this.goal.findAndCount({
      take: paginate.limit,
      skip: paginate.offset,
      where: {
        userId,
      },
    });

    return {
      items,
      count,
    };
  }

  getGoal(id: number): Promise<GoalResponseDto> {
    return this.goal.findOneOrFail(id);
  }

  createGoal(
    body: CreateGoalDto,
  ): Promise<GoalResponseDto> {
    return this.goal.save(body);
  }

  async updateGoal(id: number, body: UpdateGoalDto) {
    await this.goal.update(id, body);
  }
  // TODO Везде нет проверке по юзер id и доступа к контенту
  async deleteGoal(id: number) {
    await this.goal.delete(id);
  }
}
