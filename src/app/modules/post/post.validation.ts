import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    email: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
    isBlocked: z.boolean(),
  }),
});

export const PostValidations = {
  createPostSchema,
};
