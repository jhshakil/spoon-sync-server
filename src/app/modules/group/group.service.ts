import { TAuth } from '../auth/auth.interface';
import { User } from '../user/user.model';
import { TGroup } from './group.interface';
import { Group } from './group.modal';

const createGroup = async (payload: TGroup, user: TAuth) => {
  const existingUser = await User.findOne({ email: user.email });

  if (!existingUser) {
    throw new Error('User not found');
  }
  payload.admins = [existingUser._id];
  const result = await Group.create(payload);
  return result;
};

const getAllGroup = async () => {
  const result = await Group.find();
  return result;
};

export const GroupServices = {
  createGroup,
  getAllGroup,
};
