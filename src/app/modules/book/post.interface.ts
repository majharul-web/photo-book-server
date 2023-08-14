import { Model } from 'mongoose';

export type IPostReview = {
  email: string;
  comment: string;
};

export type IPost = {
  image: string;
  details: string;
  like?: number;
  reviews: IPostReview[];
  createdBy: string;
};

export type PostModel = Model<IPost, Record<string, unknown>>;

export type IPostFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
  title?: string;
  author?: string;
};
