import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    email: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    status: z.enum(['published', 'draft', 'blocked']),
  }),
});

export const PostValidations = {
  createPostSchema,
};
