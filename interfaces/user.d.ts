import { Role } from '../common/constants/role';

export type UserT = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  role: Role,
  blocked: boolean,
  refreshToken: string | null
};

export type UserModelT = Omit<UserT, 'id' | 'role'>;
export type UserCreateT = Omit<UserT, 'id' | 'role'>;
export type UserLoginT = Omit<UserT, 'id' | 'phone' | 'firstname' | 'lastname'>;
