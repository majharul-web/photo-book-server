import { z } from 'zod';

const userLoginZodSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .refine(value => value.length >= 8, {
        message: 'Password must be at least 8 characters long',
      }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
  }),
});

export const AuthValidation = {
  userLoginZodSchema,
};
