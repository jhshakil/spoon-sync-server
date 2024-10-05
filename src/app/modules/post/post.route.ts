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
router.get('/', PostControllers.getAllPost);
router.get('/:email', PostControllers.getPostByEmail);
router.get('/single/:id', PostControllers.getSinglePost);

export const PostRoutes = router;
