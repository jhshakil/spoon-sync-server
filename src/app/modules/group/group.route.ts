import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from '../auth/auth.constant';
import validateRequest from '../../middlewares/validateRequest';
import { GroupValidations } from './group.validation';
import { GroupControllers } from './group.controller';

const router = Router();

router.post(
  '/',
  auth(AUTH_ROLE.user),
  validateRequest(GroupValidations.createGroupSchema),
  GroupControllers.createGroup,
);

router.get('/', GroupControllers.getAllGroup);

export const GroupRoutes = router;
