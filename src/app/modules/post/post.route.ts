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

router.patch(
  '/:id',
  validateRequest(PostValidations.updatePostSchema),
  PostControllers.updatePost,
);
router.delete('/:id', PostControllers.deletePost);

router.post(
  '/action/:id',
  validateRequest(PostValidations.actionPostSchema),
  PostControllers.actionPost,
);

router.post(
  '/comment/:id',
  validateRequest(PostValidations.createCommentPostSchema),
  PostControllers.createCommentPost,
);
router.patch(
  '/comment/:id',
  validateRequest(PostValidations.updateCommentPostSchema),
  PostControllers.updateCommentPost,
);
router.delete('/comment/:id', PostControllers.deleteCommentPost);
router.post(
  '/ratting/:id',
  validateRequest(PostValidations.createRattingPostSchema),
  PostControllers.updateRattingPost,
);

export const PostRoutes = router;
