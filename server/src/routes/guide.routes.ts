import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getGuide } from '../controllers/guide.controller.js';

const router = Router();

router.use(authenticateToken);

router.get('/:countryCode', getGuide);

export default router;
