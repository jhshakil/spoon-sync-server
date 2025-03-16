import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAuth } from '../auth/auth.interface';
import { GroupServices } from './group.service';

const createGroup = catchAsync(async (req, res) => {
  const result = await GroupServices.createGroup(req.body, req.user as TAuth);

  sendResponse(res, {
    message: 'Group create successfully',
    data: result,
  });
});

const getAllGroup = catchAsync(async (req, res) => {
  const result = await GroupServices.getAllGroup();

  sendResponse(res, {
    message: 'Group Get successfully',
    data: result,
  });
});

export const GroupControllers = {
  createGroup,
  getAllGroup,
};
