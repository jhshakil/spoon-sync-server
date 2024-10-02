import { Types } from 'mongoose';

export type TAdmin = {
  authId: Types.ObjectId;
  email: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
};
