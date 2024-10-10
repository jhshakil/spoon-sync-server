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

const actionPostSchema = z.object({
  body: z.object({
    type: z.enum(['up', 'down']),
    userId: z.string(),
  }),
});

const createCommentPostSchema = z.object({
  body: z.object({
    text: z.string(),
    userId: z.string(),
  }),
});

const updateCommentPostSchema = z.object({
  body: z.object({
    text: z.string(),
  }),
});

const createRattingPostSchema = z.object({
  body: z.object({
    count: z.string(),
    userId: z.string(),
  }),
});

export const PostValidations = {
  createPostSchema,
  updatePostSchema,
  actionPostSchema,
  createCommentPostSchema,
  updateCommentPostSchema,
  createRattingPostSchema,
};
