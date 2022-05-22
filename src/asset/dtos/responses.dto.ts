import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ActionTypeEnum } from '../enums/actionType.enum';

export class AssetResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  count: number;

  @ApiModelProperty()
  cost: number;

  @ApiModelProperty()
  createdAt: Date;
}

export class AssetResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: AssetResponseDto,
  })
  items: AssetResponseDto[];

  @ApiModelProperty()
  count: number;
}

export class AssetActionResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  ticker: string;

  @ApiModelProperty()
  count: number;

  @ApiModelProperty()
  cost: number;

  @ApiModelProperty({
    enum: Object.keys(ActionTypeEnum),
    example: ActionTypeEnum.OUTGOING
  })
  type: ActionTypeEnum;

  @ApiModelProperty()
  createdAt: Date;
}

export class AssetActionResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: AssetActionResponseDto,
  })
  items: AssetActionResponseDto[];

  @ApiModelProperty()
  count: number;
}

export class PropertyResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({
    type: 'string',
    nullable: true
  })
  preview: string | null;

  @ApiModelProperty()
  cost: number;

  @ApiModelProperty()
  createdAt: Date;
}

export class PropertyResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: PropertyResponseDto,
  })
  items: PropertyResponseDto[];

  @ApiModelProperty()
  count: number;
}
