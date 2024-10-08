import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from '../auth/auth.constant';

const router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:email', AdminControllers.getAdmin);
router.patch(
  '/:email',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.patch(
  '/status/:email',
  auth(AUTH_ROLE.superAdmin),
  AdminControllers.updateAdminStatus,
);
router.delete(
  '/:email',
  auth(AUTH_ROLE.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;
