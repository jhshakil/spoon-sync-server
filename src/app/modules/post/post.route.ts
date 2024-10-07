import { Router } from 'express';
import { PostControllers } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidations } from './post.validation';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from '../auth/auth.constant';

const router = Router();

router.post(
  '/',
  auth(AUTH_ROLE.user),
  validateRequest(PostValidations.createPostSchema),
  PostControllers.createPost,
);
router.get('/', PostControllers.getAllPost);
router.get('/:email', PostControllers.getPostByEmail);
router.get('/single/:id', PostControllers.getSinglePost);

export const PostRoutes = router;
