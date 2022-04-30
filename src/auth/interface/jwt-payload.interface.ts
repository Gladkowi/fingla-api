import { Role } from '../../user/role.enum';

export interface JwtPayload {
  userid: number;
  phone: string;
  role: Role;
}
