import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class EventResponseDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({
    type: 'string'
  })
  comment: string | null;

  @ApiModelProperty()
  date: Date;

  @ApiModelProperty({
    type: 'string'
  })
  tag: string | null;

  @ApiModelProperty()
  sum: number;
}

export class EventResponsePaginationDto {
  @ApiModelProperty({
    isArray: true,
    type: EventResponseDto,
  })
  items: EventResponseDto[];

  @ApiModelProperty()
  count: number;
}
