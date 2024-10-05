import { TPost } from './post.interface';
import { Post } from './post.modal';

const createPostIntoDB = async (payload: TPost) => {
  const post = await Post.create(payload);
  return post;
};

const getAllPostFromDB = async () => {
  const post = await Post.find();
  return post;
};

const getPostByEmailFromDB = async (email: string) => {
  const post = await Post.find({ email });
  return post;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getPostByEmailFromDB,
};
