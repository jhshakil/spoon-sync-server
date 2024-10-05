import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String },
    content: { type: String },
    tags: [{ type: String }],
    isPublished: { type: Boolean },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Post = model<TPost>('Post', postSchema);