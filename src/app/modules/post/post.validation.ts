import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    title: z.string(),
    thumbnail: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
  }),
});

export const PostValidations = {
  createPostSchema,
};
