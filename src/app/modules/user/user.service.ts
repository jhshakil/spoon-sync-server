import { Types } from 'mongoose';
import { TAuth } from '../auth/auth.interface';
import { Auth } from '../auth/auth.modal';
import { TFollow, TUser } from './user.interface';
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
  });
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

const getAllUnFollowUserIntoDB = async (email: string) => {
  const allUser = await User.find({ email: { $ne: email } });
  const singleUser = await User.findOne({ email }, 'following');

  const result = allUser?.filter(
    (user) =>
      !singleUser?.following.find((follow) => follow.userId.equals(user._id)),
  );
  return result;
};

const getAllFollowUserIntoDB = async (email: string) => {
  const allUser = await User.find({ email: { $ne: email } });
  const singleUser = await User.findOne({ email }, 'following');

  const result = allUser?.filter((user) =>
    singleUser?.following.find((follow) => follow.userId.equals(user._id)),
  );
  return result;
};

const followUserIntoDB = async (email: string, payload: TFollow) => {
  await User.findOneAndUpdate(
    { email: email },
    { $addToSet: { following: payload } },
    { new: true, useFindAndModify: false },
  );

  const newUser = await User.findById({ _id: payload.userId });
  const myUserId = await User.findOne({ email });

  await User.findOneAndUpdate(
    { email: newUser?.email },
    { $addToSet: { follower: { userId: myUserId?._id } } },
    { new: true, useFindAndModify: false },
  );
  return '';
};

const unFollowUserIntoDB = async (email: string, payload: TFollow) => {
  await User.findOneAndUpdate(
    { email: email },
    {
      $pull: {
        following: {
          userId: new Types.ObjectId(payload.userId),
        },
      },
    },
    { new: true, useFindAndModify: false },
  );

  const newUser = await User.findById({ _id: payload.userId });
  const myUserId = await User.findOne({ email });

  await User.findOneAndUpdate(
    { email: newUser?.email },
    { $pull: { follower: { userId: new Types.ObjectId(myUserId?._id) } } },
    { new: true, useFindAndModify: false },
  );
  return '';
};

export const UserServices = {
  getAllUserIntoDB,
  getUserIntoDB,
  updateUserFromDB,
  updateUserStatusIntoDB,
  deleteUserFromDB,
  getAllUnFollowUserIntoDB,
  getAllFollowUserIntoDB,
  followUserIntoDB,
  unFollowUserIntoDB,
};
