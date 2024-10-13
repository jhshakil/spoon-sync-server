import { Types } from 'mongoose';
import { POST_STATUS } from './post.constant';

export type TPost = {
  userId: Types.ObjectId;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: TTag[];
  status: TStatus;
  isDeleted: boolean;
  isPro: boolean;
  totalUpVote: string;
  totalDownVote: string;
  totalComment: string;
  averageRatting: string;
  action: TAction[];
  comment: TComment[];
  ratting: TRatting[];
};

export type TTag = {
  id: string;
  text: string;
};

export type TAction = {
  type: 'up' | 'down';
  userId: Types.ObjectId;
};

export type TComment = {
  _id?: string;
  text: string;
  userId: Types.ObjectId;
};

export type TRatting = {
  count: string;
  userId: Types.ObjectId;
};

export type TStatus = keyof typeof POST_STATUS;
