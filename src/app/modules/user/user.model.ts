/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TFollow, TUser } from './user.interface';

const followSchema = new Schema<TFollow>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

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
  profileImage: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/spoon-sync-image.appspot.com/o/files%2Fa974d006-66a2-4205-b42f-12cc14141b8f?alt=media&token=f61c46c8-f5a9-4df0-8b8c-32ebb361aa75',
  },
  phoneNumber: { type: String },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  dateOfBirth: { type: String },
  totalFollower: { type: String, default: '0' },
  totalFollowing: { type: String, default: '0' },
  follower: { type: [followSchema], default: [] },
  following: { type: [followSchema], default: [] },
  isPro: { type: Boolean },
  proValidity: { type: String },
  transactionId: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false },
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const User = model<TUser>('User', userSchema);
