import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const signUp = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};
const signIn = async (payload: IUser): Promise<IUser | null> => {
  const { email, password } = payload;

  // check User is exist
  const isUserExist = await User.isUserExistByEmail(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check password is match
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password not match');
  }

  const result = await User.findOne({ email: email });

  return result;
};

export const AuthService = {
  signUp,
  signIn,
};
