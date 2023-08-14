import { About } from './about.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IAbout } from './about.interface';

const createAbout = async (about: IAbout): Promise<IAbout | null> => {
  const result = await About.create(about);
  return result;
};

const getAbout = async (): Promise<IAbout[] | null> => {
  const result = await About.find();
  return result;
};

const deleteSingleAbout = async (id: string): Promise<IAbout | null> => {
  const result = await About.findOneAndDelete({ _id: id });
  return result;
};

const updateAbout = async (
  id: string,
  payload: Partial<IAbout>
): Promise<IAbout | null> => {
  const isExist = await About.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'About not found !');
  }

  const result = await About.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AboutService = {
  createAbout,
  deleteSingleAbout,
  updateAbout,
  getAbout,
};
