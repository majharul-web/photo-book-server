import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAbout } from './about.interface';
import { Request, Response } from 'express';
import { AboutService } from './about.service';

const createAbout = catchAsync(async (req: Request, res: Response) => {
  const AboutData = req.body;
  const result = await AboutService.createAbout(AboutData);

  sendResponse<IAbout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About created successfully!',
    data: result,
  });
});

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.getAbout();

  sendResponse<IAbout[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About retrieved successfully !',
    data: result,
  });
});

const deleteAbout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutService.deleteSingleAbout(id);

  sendResponse<IAbout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About deleted successfully!',
    data: result,
  });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const AboutData = req.body;
  const result = await AboutService.updateAbout(id, AboutData);

  sendResponse<IAbout>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'About updated successfully!',
    data: result,
  });
});

export const AboutController = {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
};
