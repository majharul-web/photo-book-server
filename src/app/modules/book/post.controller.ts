import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IPost } from './post.interface';
import { Request, Response } from 'express';
import { PostService } from './post.service';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/paginations';
import { postFilterableFields } from './post.constant';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const postData = req.body;
  const result = await PostService.createPost(postData);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post created successfully!',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, postFilterableFields);

  const paginationOptions = pick(req.query, paginationField);

  const result = await PostService.getAllPosts(filters, paginationOptions);

  sendResponse<IPost[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostService.getSinglePost(id);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post retrieved successfully!',
    data: result,
  });
});
const deleteSinglePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostService.deleteSinglePost(id);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post deleted successfully!',
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const postData = req.body;
  const result = await PostService.updatePost(id, postData);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post updated successfully!',
    data: result,
  });
});

const reviewPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviewData = req.body;
  const result = await PostService.reviewPost(id, reviewData);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post review updated successfully!',
    data: result,
  });
});

const LikePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { like } = req.body;
  const result = await PostService.LikePost(id, like);

  sendResponse<IPost>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'post like updated successfully!',
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPosts,
  getSinglePost,
  deleteSinglePost,
  updatePost,
  reviewPost,
  LikePost,
};
