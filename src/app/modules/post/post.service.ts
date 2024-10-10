import { Types } from 'mongoose';
import { TAction, TPost } from './post.interface';
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

const actionPostIntoDB = async (id: string, payload: TAction) => {
  // Check if the action already exists (same authId and type)
  const fullMatched = await Post.findOne({
    _id: id,
    'action.authId': payload.authId,
    'action.type': payload.type,
  });

  let updatedPost;

  if (fullMatched) {
    // If the action exists, delete it (removing the vote)
    updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { action: { authId: payload.authId, type: payload.type } },
      },
      { new: true, useFindAndModify: false },
    );
  } else {
    // Check if the user has any action, but with a different type (update the vote)
    const tag = await Post.findOne({
      _id: id,
      'action.authId': payload.authId,
    });

    if (tag) {
      // Update the existing action's type (i.e., change up to down or vice versa)
      updatedPost = await Post.findOneAndUpdate(
        { _id: id, 'action.authId': payload.authId },
        { $set: { 'action.$.type': payload.type } },
        { new: true, useFindAndModify: false },
      );
    } else {
      // Add a new action if none exists
      updatedPost = await Post.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { action: payload } },
        { new: true, useFindAndModify: false },
      );
    }
  }

  // Recalculate total upvotes and downvotes
  const totalUp = await Post.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $project: {
        totalUp: {
          $size: {
            $filter: {
              input: '$action',
              as: 'action',
              cond: { $eq: ['$$action.type', 'up'] },
            },
          },
        },
      },
    },
  ]);

  const totalDown = await Post.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $project: {
        totalDown: {
          $size: {
            $filter: {
              input: '$action',
              as: 'action',
              cond: { $eq: ['$$action.type', 'down'] },
            },
          },
        },
      },
    },
  ]);

  // Update the total upvotes and downvotes in the Post model
  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      totalUpVote: totalUp[0]?.totalUp || 0,
      totalDownVote: totalDown[0]?.totalDown || 0,
    },
    { new: true, useFindAndModify: false },
  );

  return updatedPost;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostFromDB,
  getPostByEmailFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  actionPostIntoDB,
};
