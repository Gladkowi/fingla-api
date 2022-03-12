import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationReqModel {
	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	password: string;

	@ApiProperty({ enum: Role })
	role: Role;
}
