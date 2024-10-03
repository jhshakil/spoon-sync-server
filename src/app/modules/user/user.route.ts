import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUser);
router.get('/:email', UserControllers.getUser);
router.patch(
  '/:email',
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
