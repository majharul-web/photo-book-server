import { Model } from 'mongoose';

export type IAbout = {
  name: string;
  email: string;
  institute: string;
  address: string;
};

export type AboutModel = Model<IAbout, Record<string, unknown>>;
