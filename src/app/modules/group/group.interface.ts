import { Types } from 'mongoose';
import { GROUP_STATUS } from './group.constant';

export type TGroup = {
  name: string;
  description: string;
  admins: Types.ObjectId[];
  members: Types.ObjectId[];
  logo: string;
  banner: string;
  isDeleted: boolean;
  status: TGroupStatus;
};

export type TGroupStatus = keyof typeof GROUP_STATUS;
