import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const getAllUserIntoDB = async () => {
  const user = await User.find();
  return user;
};

const getUserIntoDB = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserFromDB = async (email: string, payload: TUser) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserIntoDB,
  getUserIntoDB,
  updateUserFromDB,
};
