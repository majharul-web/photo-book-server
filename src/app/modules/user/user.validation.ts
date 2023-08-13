import { z } from 'zod';
import { userRole } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    phoneNumber: z
      .string()
      .refine(value => /^(?:\+?88)?01[13-9]\d{8}$/.test(value), {
        message: 'Invalid Bangladeshi phone number',
      })
      .optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .optional(),
    phoneNumber: z
      .string()
      .optional()
      .refine(
        value => value === undefined || /^(?:\+?88)?01[13-9]\d{8}$/.test(value),
        {
          message: 'Invalid Bangladeshi phone number',
        }
      ),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
