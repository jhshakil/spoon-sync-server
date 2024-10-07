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
  isPro: boolean;
  following: string;
  follower: string;
  isDeleted: boolean;
};

export type TGender = keyof typeof USER_GENDER;
