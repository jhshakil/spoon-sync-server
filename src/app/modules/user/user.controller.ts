import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

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

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserStatusIntoDB(
    req.params.email,
    req.body,
  );

  sendResponse(res, {
    message: 'Status update successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserServices.deleteUserFromDB(req.params.email);

  sendResponse(res, {
    message: 'User delete successfully',
    data: result,
  });
});

const getAllUnFollowUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUnFollowUserIntoDB(req.params.email);

  sendResponse(res, {
    message: 'Get user successfully',
    data: result,
  });
});

const followUser = catchAsync(async (req, res) => {
  const result = await UserServices.followUserIntoDB(
    req.params.email,
    req.body,
  );

  sendResponse(res, {
    message: 'User follow successfuly',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getUser,
  updateUser,
  updateUserStatus,
  deleteUser,
  getAllUnFollowUser,
  followUser,
};
