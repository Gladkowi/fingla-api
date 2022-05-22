import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpendEntity } from './spend.entity';
import { CreateSpendDto } from './dtos/create-spend.dto';
import { UpdateSpendDto } from './dtos/update-spend.dto';
import { PlannedSpendResponseDto, PlannedSpendResponsePaginationDto } from './dtos/responses.dto';

@Injectable()
export class SpendService {
  constructor(
    @InjectRepository(SpendEntity)
    private plannedSpend: Repository<SpendEntity>,
  ) { }

  async getListPlannedSpend(
    userId: number,
    paginate: PaginationDto
  ): Promise<PlannedSpendResponsePaginationDto> {
    const [items, count] = await this.plannedSpend.findAndCount({
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
  createPlannedSpend(body: CreateSpendDto): Promise<PlannedSpendResponseDto> {
    return this.plannedSpend.save(body);
  }

  getPlannedSpend(id: number): Promise<PlannedSpendResponseDto> {
    return this.plannedSpend.findOneOrFail(id);
  }

  async updatePlannedSpend(id: number, body: UpdateSpendDto) {
    await this.plannedSpend.update(id, body);
  }

  async deletePlannedSpend(id: number) {
    await this.plannedSpend.delete(id);
  }
}
