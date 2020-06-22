export type UserInfo = {
  id: number;
  name: string;
  email: string;
  balance: number;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  password: string;
};