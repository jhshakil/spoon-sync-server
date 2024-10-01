import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/user', UserControllers.getAllUser);
router.get('/user/:email', UserControllers.getUser);
router.patch(
  '/user/:email',
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
