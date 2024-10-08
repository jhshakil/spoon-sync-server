import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    email: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    content: z.string(),
    tags: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    ),
    status: z.enum(['published', 'draft', 'blocked']),
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    title: z.string().optional(),
    thumbnail: z.string().optional(),
    content: z.string().optional(),
    tags: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
    status: z.enum(['published', 'draft', 'blocked']).optional(),
  }),
});

export const PostValidations = {
  createPostSchema,
  updatePostSchema,
};
