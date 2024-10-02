import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminIntoDB = async () => {
  const admin = await Admin.find();
  return admin;
};

const getAdminIntoDB = async (email: string) => {
  const admin = await Admin.findOne({ email });
  return admin;
};

const updateAdminFromDB = async (email: string, payload: TAdmin) => {
  const result = await Admin.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminServices = {
  getAllAdminIntoDB,
  getAdminIntoDB,
  updateAdminFromDB,
};
