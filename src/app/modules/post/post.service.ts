import { Types } from 'mongoose';
import { TAction, TComment, TPost, TRatting } from './post.interface';
import { Post } from './post.modal';

const createPostIntoDB = async (payload: TPost) => {
  const post = await Post.create(payload);
  return post;
};

const getAllPostFromDB = async () => {
  const post = await Post.find().populate('userId').populate({
    path: 'comment.userId',
    select: 'name',
  });

  return post;
};

const getPostByEmailFromDB = async (email: string) => {
  const post = await Post.find({ email }).populate('userId').populate({
    path: 'comment.userId',
    select: 'name',
  });
  return post;
};

const getSinglePostFromDB = async (id: string) => {
  const post = await Post.findById({ _id: id }).populate('userId').populate({
    path: 'comment.userId',
    select: 'name',
  });
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
  const fullMatched = await Post.findOne({
    _id: id,
    action: {
      $elemMatch: {
        userId: payload.userId,
        type: payload.type,
      },
    },
  });

  let updatedPost;

  if (fullMatched) {
    // If the action exists, delete it (removing the vote)
    updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { action: { userId: payload.userId, type: payload.type } },
      },
      { new: true, useFindAndModify: false },
    );
  } else {
    // Check if the user has any action, but with a different type (update the vote)
    const tag = await Post.findOne({
      _id: id,
      action: {
        $elemMatch: {
          userId: payload.userId,
        },
      },
    });

    if (tag) {
      // Update the existing action's type (i.e., change up to down or vice versa)
      updatedPost = await Post.findOneAndUpdate(
        {
          _id: id,
          action: {
            $elemMatch: {
              userId: payload.userId,
            },
          },
        },
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

const createCommentPostIntoDB = async (id: string, payload: TComment) => {
  let updatedPost;

  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { comment: payload } },
    { new: true, useFindAndModify: false },
  );

  const total = await Post.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $project: {
        total: { $size: '$comment' },
      },
    },
  ]);

  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      totalComment: total[0]?.total || 0,
    },
    { new: true, useFindAndModify: false },
  );

  return updatedPost;
};

const updateCommentPostIntoDB = async (
  id: string,
  cid: string,
  payload: Partial<TComment>,
) => {
  const updatedPost = await Post.findOneAndUpdate(
    {
      _id: id,
      comment: {
        $elemMatch: {
          _id: cid,
        },
      },
    },
    { $set: { 'comment.$.text': payload.text } },
    { new: true, useFindAndModify: false },
  );

  return updatedPost;
};

const deleteCommentPostIntoDB = async (id: string, cid: string) => {
  let updatedPost;

  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      $pull: { comment: { _id: new Types.ObjectId(cid) } },
    },
    { new: true },
  );

  const total = await Post.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $project: {
        total: { $size: '$comment' },
      },
    },
  ]);

  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      totalComment: total[0]?.total || 0,
    },
    { new: true },
  );

  return updatedPost;
};

const updateRattingPostIntoDB = async (
  id: string,
  payload: Partial<TRatting>,
) => {
  let updatedPost;

  const rate = await Post.findOne({
    _id: id,
    ratting: {
      $elemMatch: {
        userId: payload.userId,
      },
    },
  });

  if (rate) {
    updatedPost = await Post.findOneAndUpdate(
      {
        _id: id,
        ratting: {
          $elemMatch: {
            userId: payload.userId,
          },
        },
      },
      { $set: { 'ratting.$.count': payload.count } },
      { new: true, useFindAndModify: false },
    );
  } else {
    updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { ratting: payload } },
      { new: true, useFindAndModify: false },
    );
  }

  const average = await Post.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $project: {
        average: {
          $avg: {
            $map: {
              input: '$ratting',
              as: 'ratting',
              in: { $toDouble: '$$ratting.count' },
            },
          },
        },
      },
    },
  ]);

  updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    {
      averageRatting: average[0]?.average || 0,
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
  createCommentPostIntoDB,
  updateCommentPostIntoDB,
  deleteCommentPostIntoDB,
  updateRattingPostIntoDB,
};
