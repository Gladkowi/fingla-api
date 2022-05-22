import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PlannedSpendResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  isMonthly: boolean;

  @ApiModelProperty()
  date: Date;

  @ApiModelProperty()
  cost: number;

  @ApiModelProperty()
  createdAt: Date;
}

export class PlannedSpendResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: PlannedSpendResponseDto,
  })
  items: PlannedSpendResponseDto[];

  @ApiModelProperty()
  count: number;
}
