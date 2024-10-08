import { TAuth } from '../auth/auth.interface';
import { Auth } from '../auth/auth.modal';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminIntoDB = async () => {
  const admin = await Admin.find().populate('authId');
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

const updateAdminStatusIntoDB = async (email: string, payload: TAuth) => {
  const result = await Auth.findOneAndUpdate({ email }, payload, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (email: string) => {
  await Auth.findOneAndUpdate({ email }, { isDeleted: true }, { new: true });
  const admin = await Admin.findOneAndUpdate(
    { email },
    { isDeleted: true },
    { new: true },
  );
  return admin;
};

export const AdminServices = {
  getAllAdminIntoDB,
  getAdminIntoDB,
  updateAdminFromDB,
  updateAdminStatusIntoDB,
  deleteAdminFromDB,
};
