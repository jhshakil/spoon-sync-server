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

const getSinglePostFromDB = async (id: string) => {
  const post = await Post.findById({ _id: id });
  return post;
};

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const post = await Post.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return post;
};

const deletePostFromDB = async (id: string) => {
  const post = await Post.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return post;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getPostByEmailFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
};
