import { TPost } from './post.interface';
import { Post } from './post.modal';

const createPostIntoDB = async (payload: TPost) => {
  const post = await Post.create(payload);
  return post;
};

export const PostServices = {
  createPostIntoDB,
};
