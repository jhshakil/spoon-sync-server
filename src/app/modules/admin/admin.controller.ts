import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminIntoDB();

  sendResponse(res, {
    message: 'Get admins successfully',
    data: result,
  });
});
const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminIntoDB(req.params.email);

  sendResponse(res, {
    message: 'Get admin successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminFromDB(
    req.params.email,
    req.body,
  );

  result
    ? sendResponse(res, {
        message: 'Admin updated successfully',
        data: result,
      })
    : sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Admin updated failed',
        data: result,
      });
});

const updateAdminStatus = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminStatusIntoDB(
    req.params.email,
    req.body,
  );

  sendResponse(res, {
    message: 'Status update successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteAdminFromDB(req.params.email);

  sendResponse(res, {
    message: 'Admin delete successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getAdmin,
  updateAdmin,
  updateAdminStatus,
  deleteAdmin,
};
