import { Schema, model } from 'mongoose';
import { IPost, PostModel } from './post.interface';

const PostSchema = new Schema<IPost>(
  {
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [{ email: String, comment: String }],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Post = model<IPost, PostModel>('Post', PostSchema);
