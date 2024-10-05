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

export const PostControllers = {
  createPost,
  getAllPost,
  getPostByEmail,
};
