import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    image: z.string({
      required_error: 'Image is required',
    }),
    details: z.string({
      required_error: 'Details is required',
    }),
  }),
});

export const PostSchema = {
  createPostZodSchema,
};
