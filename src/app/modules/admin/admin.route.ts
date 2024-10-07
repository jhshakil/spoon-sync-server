import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = Router();

router.get('/', AdminControllers.getAllAdmin);
router.get('/:email', AdminControllers.getAdmin);
router.patch(
  '/:email',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

export const AdminRoutes = router;
