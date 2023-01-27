import { Role } from '../common/constants/role';
import { Optional } from 'sequelize';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  password: string;
  role: Role;
  blocked: boolean;
  favorites: string[];
  refreshToken: string | null;
}

export interface IUserCreationAttributes extends Optional<IUser, 'id' | 'role'> {}

export type UserCreateT = Omit<UserT, 'id' | 'role'>;
export type UserLoginT = Omit<UserT, 'id' | 'phone' | 'firstname' | 'lastname'>;
