import { Router } from 'express';
import { ContactController } from './contact.controller';

const router = Router();

router.post('/', ContactController.contactUs);

export const ContactRouters = router;
