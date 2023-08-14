import { Schema, model } from 'mongoose';
import { IAbout, AboutModel } from './about.interface';

const AboutSchema = new Schema<IAbout>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const About = model<IAbout, AboutModel>('About', AboutSchema);
