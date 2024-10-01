import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    message: 'User registered successfully',
    data: '',
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserIntoDB();

  sendResponse(res, {
    message: 'Get users successfully',
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUserIntoDB(req.params.email);

  sendResponse(res, {
    message: 'Get user successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserFromDB(
    req.params.email,
    req.body,
  );

  result
    ? sendResponse(res, {
        message: 'User updated successfully',
        data: result,
      })
    : sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User updated failed',
        data: result,
      });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
};
