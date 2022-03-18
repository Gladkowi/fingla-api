import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationReqModel {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({nullable: true})
    phone: string;

    @ApiProperty()
    password: string;
}
