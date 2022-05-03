import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiModelProperty({
    type: Number,
    minimum: 0
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @ApiModelProperty({
    type: Number,
    maximum: 50,
    minimum: 1
  })
  @Type(() => Number)
  @IsInt()
  @Max(50)
  @Min(1)
  @IsOptional()
  limit: number = 15;
}
