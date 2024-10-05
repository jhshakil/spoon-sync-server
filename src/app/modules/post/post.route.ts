import { Router } from 'express';
import { PostControllers } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidations } from './post.validation';

const router = Router();

router.post(
  '/',
  validateRequest(PostValidations.createPostSchema),
  PostControllers.createPost,
);

export const PostRoutes = router;
