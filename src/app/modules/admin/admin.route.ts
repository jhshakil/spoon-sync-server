import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = Router();

router.get('/admin', AdminControllers.getAllAdmin);
router.get('/admin/:email', AdminControllers.getAdmin);
router.patch(
  '/user/:email',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

export const UserRoutes = router;
