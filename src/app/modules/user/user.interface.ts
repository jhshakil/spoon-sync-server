/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { USER_GENDER } from './user.constant';

export type TUser = {
  authId: Types.ObjectId;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  phoneNumber: string;
  gender: TGender;
  dateOfBirth: string;
  totalFollower: string;
  totalFollowing: string;
  follower: TFollow[];
  following: TFollow[];
  isPro: boolean;
  proValidity: string;
  transactionId: string;
  isDeleted: boolean;
};

export type TGender = keyof typeof USER_GENDER;

export type TFollow = {
  userId: Types.ObjectId;
};
