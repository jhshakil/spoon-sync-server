import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRouters } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ContactRouters } from '../modules/contact/contact.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/contact',
    route: ContactRouters,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
