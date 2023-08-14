import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { postSearchableFields } from './post.constant';
import { IPost, IPostFilters, IPostReview } from './post.interface';
import { Post } from './post.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createPost = async (post: IPost): Promise<IPost | null> => {
  const result = await Post.create(post);
  return result;
};

const getAllPosts = async (
  filters: IPostFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPost[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: postSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: new RegExp(value, 'i') },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Post.find(whereConditions)
    .populate('createdBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePost = async (id: string): Promise<IPost | null> => {
  const result = await Post.findOne({ _id: id }).populate('createdBy');
  return result;
};

const deleteSinglePost = async (id: string): Promise<IPost | null> => {
  const result = await Post.findOneAndDelete({ _id: id });
  return result;
};

const updatePost = async (
  id: string,
  payload: Partial<IPost>
): Promise<IPost | null> => {
  const isExist = await Post.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found !');
  }

  const result = await Post.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const reviewPost = async (
  id: string,
  payload: Partial<IPostReview>
): Promise<IPost | null> => {
  const isExist = await Post.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  // Create a new review object
  const review = {
    email: payload.email,
    comment: payload.comment,
  };

  // Update the post's reviews array with the new review
  const result = await Post.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: review } }, // Use $push to add the review to the reviews array
    { new: true }
  );

  return result;
};

const LikePost = async (id: string, payload: number): Promise<IPost | null> => {
  const isExist = await Post.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  const result = await Post.findOneAndUpdate(
    { _id: id },
    { $inc: { like: payload } },
    { new: true }
  );

  return result;
};

export const PostService = {
  createPost,
  getSinglePost,
  deleteSinglePost,
  updatePost,
  getAllPosts,
  reviewPost,
  LikePost,
};
