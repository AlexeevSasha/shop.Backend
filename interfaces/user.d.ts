export type UserT = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  role: 'user'
};

export type UserModelT = Omit<UserT, 'id' | 'role'>;
export type UserCreateT = Omit<UserT, 'id' | 'role'>;
export type UserLoginT = Omit<UserT, 'id' | 'phone' | 'firstname' | 'lastname'>;
