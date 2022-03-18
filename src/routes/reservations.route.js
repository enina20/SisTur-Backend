import {Router} from 'express';

import { getReservations } from '../controllers/reservations.controller'

const router = Router();

router.get('/api/v1/reservations', getReservations)
router.post('/api/v1/reservations', getReservations)
router.get('/api/v1/reservations/:id', getReservations)
router.delete('/api/v1/reservations', getReservations)
router.put('/api/v1/reservations', getReservations)

export default router;