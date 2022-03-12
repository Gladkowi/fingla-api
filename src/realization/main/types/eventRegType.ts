import { ApiProperty } from "@nestjs/swagger";

export class EventRegType {
    @ApiProperty()
    categoryId: number;

    @ApiProperty({nullable:true})
    markId?: number;

    @ApiProperty({nullable: true})
    comment?: string;

    @ApiProperty()
    value: number;

    @ApiProperty({nullable: true})
    date?: Date;
}