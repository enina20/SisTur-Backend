import {Router} from 'express';

import { getHotels } from '../controllers/hotels.controller'

const router = Router();

router.get('/api/v1/hotels', getHotels)
router.post('/api/v1/hotels', getHotels)
router.get('/api/v1/hotels/:cod', getHotels)
router.delete('/api/v1/hotels', getHotels)
router.put('/api/v1/hotels', getHotels)

export default router;