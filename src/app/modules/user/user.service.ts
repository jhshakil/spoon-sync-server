import { TAuth } from '../auth/auth.interface';
import { Auth } from '../auth/auth.modal';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUserIntoDB = async () => {
  const user = await User.find().populate('authId');
  return user;
};

const getUserIntoDB = async (email: string) => {
  const user = await User.findOne({ email }).populate('authId');
  return user;
};

const updateUserFromDB = async (email: string, payload: TUser) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  }).populate('authId');
  return result;
};

const updateUserStatusIntoDB = async (email: string, payload: TAuth) => {
  const result = await Auth.findOneAndUpdate({ email }, payload, {
    new: true,
  }).populate('authId');
  return result;
};

const deleteUserFromDB = async (email: string) => {
  await Auth.findOneAndUpdate({ email }, { isDeleted: true }, { new: true });
  const user = await User.findOneAndUpdate(
    { email },
    { isDeleted: true },
    { new: true },
  );
  return user;
};

export const UserServices = {
  getAllUserIntoDB,
  getUserIntoDB,
  updateUserFromDB,
  updateUserStatusIntoDB,
  deleteUserFromDB,
};
