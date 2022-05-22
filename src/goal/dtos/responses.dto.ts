import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class GoalResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  goalTotal: number;

  @ApiModelProperty()
  deadline: Date;

  @ApiModelProperty()
  currentTotal: number;

  @ApiModelProperty()
  createdAt: Date;
}

export class GoalResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: GoalResponseDto,
  })
  items: GoalResponseDto[];

  @ApiModelProperty()
  count: number;
}
