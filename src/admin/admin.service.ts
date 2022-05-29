import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SearchDto } from './dtos/search.dto';
import { PaginationDto } from '../core/dtos/pagination.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>
  ) { }

  async banUser(userId: number) {
    await this.user.update(userId, {
      bannedAt: new Date()
    });
  }

  async unbanUser(userId: number) {
    await this.user.update(userId, {
      bannedAt: null
    });
  }

  async getUsers(paginate: PaginationDto) {
    const [items, count] = await this.user.findAndCount({
      take: paginate.limit,
      skip: paginate.offset
    });

    return {
      items,
      count
    }
  }

  searchUsers(query: SearchDto) {
    return this.user.find({
     where: {
       name: query.name
     }
    });
  }
}
