import { z } from 'zod';

const createGroupSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    logo: z.string().optional(),
    banner: z.string().optional(),
    status: z.enum(['active', 'disabled', 'blocked']).optional(),
  }),
});

export const GroupValidations = {
  createGroupSchema,
};
