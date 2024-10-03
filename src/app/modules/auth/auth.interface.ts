/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { AUTH_ROLE, AUTH_STATUS } from './auth.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TAuth = {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordChangedAt?: Date;
  role: TRole;
  status: TStatus;
  isDeleted: boolean;
};

export interface AuthModel extends Model<TAuth> {
  isUserExist(email: string): Promise<TAuth>;
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
}

export type TRole = keyof typeof AUTH_ROLE;
export type TStatus = keyof typeof AUTH_STATUS;
