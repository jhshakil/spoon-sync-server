import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>({
  title: { type: String, required: true },
  thumbnail: { type: String },
  content: { type: String },
  tags: [{ type: String }],
});

export const Post = model<TPost>('Post', postSchema);
