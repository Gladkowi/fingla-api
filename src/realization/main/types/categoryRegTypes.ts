import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypeEnum } from "./categoryType.enum";

export class CategoryRegTypes {
    @ApiProperty({nullable: true})
    groupId?: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({nullable: true})
    limit?: number;

    @ApiProperty({nullable: true})
    color?: string;

    @ApiProperty({enum: CategoryTypeEnum})
    type: CategoryTypeEnum;
}