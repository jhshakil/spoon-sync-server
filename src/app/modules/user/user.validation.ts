import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, 'Password can not be more than 20 characters'),
    phone: z.string(),
    role: z.enum(['admin', 'user']),
    address: z.string(),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
    address: z.string().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
