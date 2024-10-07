import { Types } from 'mongoose';
import { POST_STATUS } from './post.constant';

export type TPost = {
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  status: TStatus;
  isDeleted: boolean;
  totalUpVote: string;
  totalDownVote: string;
  totalComment: string;
  action: TAction[];
  comment: TComment[];
};

export type TAction = {
  type: 'up' | 'down';
  authId: Types.ObjectId;
};

export type TComment = {
  text: string;
  authId: Types.ObjectId;
};

export type TStatus = keyof typeof POST_STATUS;
