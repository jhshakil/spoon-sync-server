/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  authId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Auth',
  },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String },
  profileImage: { type: String },
  phoneNumber: { type: String },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  dateOfBirth: { type: String },
  following: { type: String },
  follower: { type: String },
  isPro: { type: Boolean },
});

export const User = model<TUser>('User', userSchema);
