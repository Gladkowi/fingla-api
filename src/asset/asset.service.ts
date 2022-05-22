import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationDto } from '../core/dtos/pagination.dto';
import { AssetEntity } from './asset.entity';
import {
  AssetActionResponsePaginationDto,
  AssetResponseDto,
  AssetResponsePaginationDto, PropertyResponseDto, PropertyResponsePaginationDto,
} from './dtos/responses.dto';
import { CreateAssetDto } from './dtos/create-asset.dto';
import { AssetActionEntity } from './asset-action.entity';
import { ActionTypeEnum } from './enums/actionType.enum';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { PropertyEntity } from './property.entity';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private asset: Repository<AssetEntity>,
    @InjectRepository(AssetActionEntity)
    private assetAction: Repository<AssetActionEntity>,
    @InjectRepository(PropertyEntity)
    private property: Repository<PropertyEntity>,
    private connection: Connection
  ) { }

  async getListAsset(
    userId: number,
    paginate: PaginationDto,
  ): Promise<AssetResponsePaginationDto> {
    const [items, count] = await this.asset.findAndCount({
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

  async getListAssetsActions(
    userId: number,
    paginate: PaginationDto,
  ): Promise<AssetActionResponsePaginationDto> {
    const [items, count] = await this.assetAction.findAndCount({
      take: paginate.limit,
      skip: paginate.offset,
      relations: ['asset'],
      where: {
        asset: {
          userId
        },
      },
    });

    return {
      items,
      count,
    };
  }

  getAsset(id: number): Promise<AssetResponseDto> {
    return this.asset.findOneOrFail(id);
  }

  async actionAsset(
    body: CreateAssetDto,
  ) {
    const transactRunner = this.connection.createQueryRunner();
    await transactRunner.startTransaction();
    try {
      const ticker = await transactRunner.manager
      .createQueryBuilder(AssetEntity, 'a')
      .where('a.ticker ILIKE :name', {
        name: body.ticker
      })
      .andWhere('a.userId = :id', {
        id: body.userId
      })
      .getOne()
      if(ticker) {
        const newCost = (ticker.count * ticker.cost + body.count * body.cost) / (ticker.count + body.count);
        await transactRunner.manager
        .createQueryBuilder()
        .update(AssetEntity)
        .set({
          cost: newCost,
          count: ticker.count + body.count
        })
        .where('id = :id', {
          id: ticker.id
        })
        .execute();
        await transactRunner.manager
        .createQueryBuilder()
        .insert()
        .into(AssetActionEntity)
        .values({
          ticker: body.ticker,
          type: ActionTypeEnum.INCOMING,
          count: body.count,
          cost: body.cost,
          assetId: ticker.id
        })
        .execute();
      } else {
        const newTickerId = await transactRunner.manager
        .createQueryBuilder()
        .insert()
        .into(AssetEntity)
        .values(body)
        .returning('id')
        .execute();
        await transactRunner.manager
        .createQueryBuilder()
        .insert()
        .into(AssetActionEntity)
        .values({
          ticker: body.ticker,
          type: ActionTypeEnum.INCOMING,
          count: body.count,
          cost: body.cost,
          assetId: newTickerId.raw[0].id
        })
        .execute();
      }
      await transactRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await transactRunner.rollbackTransaction();
    } finally {
      await transactRunner.release();
    }
  }

  async deleteAsset(id: number) {
    const transactRunner = this.connection.createQueryRunner();
    await transactRunner.startTransaction();
    try {
      await transactRunner.manager
      .createQueryBuilder(AssetEntity, 'a')
      .where('a.id = :id', {
        id
      })
      .delete();
      await transactRunner.manager
      .createQueryBuilder()
      .insert()
      .into(AssetActionEntity)
      .values({
        type: ActionTypeEnum.OUTGOING,
        assetId: id
      })
      .execute();
      await transactRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await transactRunner.rollbackTransaction();
    } finally {
      await transactRunner.release();
    }
  }

  async getListProperties(
    userId: number,
    paginate: PaginationDto
  ): Promise<PropertyResponsePaginationDto> {
    const [items, count] = await this.property.findAndCount({
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

  createProperty(body: CreatePropertyDto): Promise<PropertyResponseDto> {
    return this.property.save(body);
  }

  getProperty(id: number): Promise<PropertyResponseDto> {
    return this.property.findOneOrFail(id);
  }

  async updateProperty(id: number, body: UpdatePropertyDto) {
    await this.property.update(id, body);
  }

  async deleteProperty(id: number) {
    await this.property.delete(id);
  }
}
