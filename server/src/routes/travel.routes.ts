import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  createTravel,
  deleteTravel,
  getTravels,
  updateTravel,
} from '../controllers/travel.controller.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getTravels);
router.post('/', createTravel);
router.put('/:id', updateTravel);
router.delete('/:id', deleteTravel);

export default router;
