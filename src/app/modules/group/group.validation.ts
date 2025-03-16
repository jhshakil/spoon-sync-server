import { z } from 'zod';

const createGroupSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Group name must be at least 3 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    logo: z.string().url().optional(),
    banner: z.string().url().optional(),
    status: z.enum(['active', 'disabled', 'blocked']).optional(),
  }),
});

const updateGroupSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    logo: z.string().url().optional(),
    banner: z.string().url().optional(),
    status: z.enum(['active', 'disabled', 'blocked']).optional(),
  }),
});

const addAdminSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
  }),
});

const addMemberSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
  }),
});

const changeStatusSchema = z.object({
  body: z.object({
    status: z.enum(['active', 'disabled', 'blocked'], {
      required_error: 'Status is required',
    }),
  }),
});

export const GroupValidations = {
  createGroupSchema,
  updateGroupSchema,
  addAdminSchema,
  addMemberSchema,
  changeStatusSchema,
};
