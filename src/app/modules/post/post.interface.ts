import { Types } from 'mongoose';
import { POST_STATUS } from './post.constant';

export type TPost = {
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: TTag[];
  status: TStatus;
  isDeleted: boolean;
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
  authId: Types.ObjectId;
};

export type TComment = {
  text: string;
  authId: Types.ObjectId;
};

export type TRatting = {
  count: string;
  authId: Types.ObjectId;
};

export type TStatus = keyof typeof POST_STATUS;
