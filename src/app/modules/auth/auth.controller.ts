import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    message: 'User create successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  await AuthServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    message: 'Admin create successfully',
    data: '',
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  await AuthServices.forgetPassword(req.body);

  sendResponse(res, {
    message: 'Please check your email',
    data: '',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await AuthServices.resetPassword(req.body);

  sendResponse(res, {
    message: 'Please login again',
    data: '',
  });
});

const checkUniqueUserName = catchAsync(async (req, res) => {
  const result = await AuthServices.checkUniqUserName(req.body);

  sendResponse(res, {
    message: 'User name is unique',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  createAdmin,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
  checkUniqueUserName,
};
