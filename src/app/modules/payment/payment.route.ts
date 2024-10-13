import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/', PaymentControllers.makePayment);
router.post('/confirmation', PaymentControllers.confirmPayment);

export const PaymentRoutes = router;
