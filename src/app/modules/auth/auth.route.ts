import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { AUTH_ROLE } from './auth.constant';

const router = Router();

router.post(
  '/create-user',
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createUser,
);
router.post(
  '/create-admin',
  auth(AUTH_ROLE.superAdmin),
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthControllers.createAdmin,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post('/forget-password', AuthControllers.forgetPassword);
router.post('/reset-password', AuthControllers.resetPassword);
router.post('/check-username', AuthControllers.checkUniqueUserName);

export const AuthRouters = router;
