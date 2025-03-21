import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
    phoneNumber: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string().optional(),
  }),
});

const followValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
  followValidationSchema,
};
