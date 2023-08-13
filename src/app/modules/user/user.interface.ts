import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id?: string;
  role: string;
  password: string;
  name: UserName; //embedded object
  phoneNumber?: string;
  email: string;
  address: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
};
