/* eslint-disable prefer-const */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  let userData = req.body;
  if (!userData.role) {
    userData.role = 'user';
  }
  const result = await AuthService.signUp(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});
const signIn = catchAsync(async (req: Request, res: Response) => {
  let userData = req.body;

  const result = await AuthService.signIn(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: result,
  });
});

export const AuthController = {
  signUp,
  signIn,
};
