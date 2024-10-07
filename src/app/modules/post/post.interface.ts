import { POST_STATUS } from './post.constant';

export type TPost = {
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  status: TStatus;
  isDeleted: boolean;
};

export type TStatus = keyof typeof POST_STATUS;
