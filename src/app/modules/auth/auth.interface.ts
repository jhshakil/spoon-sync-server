/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TAuth = {
  email: string;
  userName: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'active' | 'inActive' | 'blocked';
  isDeleted: boolean;
};

export interface AuthModel extends Model<TAuth> {
  isUserExist(email: string): Promise<TAuth>;
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
}
