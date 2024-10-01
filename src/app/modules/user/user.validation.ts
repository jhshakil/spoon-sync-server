import { z } from 'zod';

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
  updateUserValidationSchema,
};
