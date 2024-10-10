import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    message: 'Post create successfully',
    data: result,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();

  sendResponse(res, {
    message: 'Posts get successfully',
    data: result,
  });
});
const getPostByEmail = catchAsync(async (req, res) => {
  const result = await PostServices.getPostByEmailFromDB(req.params.email);

  sendResponse(res, {
    message: 'Posts get successfully',
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const result = await PostServices.getSinglePostFromDB(req.params.id);

  sendResponse(res, {
    message: 'Post get successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const result = await PostServices.updatePostIntoDB(req.params.id, req.body);

  sendResponse(res, {
    message: 'Post update successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await PostServices.deletePostFromDB(req.params.id);

  sendResponse(res, {
    message: 'Post delete successfully',
    data: result,
  });
});

const actionPost = catchAsync(async (req, res) => {
  const result = await PostServices.actionPostIntoDB(req.params.id, req.body);

  sendResponse(res, {
    message: 'Action successfully',
    data: result,
  });
});

const createCommentPost = catchAsync(async (req, res) => {
  const result = await PostServices.createCommentPostIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    message: 'Comment successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPost,
  getPostByEmail,
  getSinglePost,
  updatePost,
  deletePost,
  actionPost,
  createCommentPost,
};
