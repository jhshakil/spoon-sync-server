import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import { AUTH_ROLE } from '../auth/auth.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', UserControllers.getAllUser);
router.get('/:email', UserControllers.getUser);
router.patch(
  '/:email',
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);
router.patch(
  '/status/:email',
  auth(AUTH_ROLE.superAdmin, AUTH_ROLE.admin),
  UserControllers.updateUserStatus,
);
router.delete(
  '/:email',
  auth(AUTH_ROLE.superAdmin, AUTH_ROLE.admin),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
