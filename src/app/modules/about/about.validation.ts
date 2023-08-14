import { z } from 'zod';

const createAboutZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
    institute: z.string({
      required_error: 'Institute is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateAboutZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    institute: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const AboutSchema = {
  createAboutZodSchema,
  updateAboutZodSchema,
};
