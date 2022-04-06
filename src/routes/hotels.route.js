import {Router} from 'express';

import { createHotel, getHotel, getHotels,getHotelsForPlace,updateHotel } from '../controllers/hotels.controller'

const router = Router();

router.get('/api/v1/hotels', getHotels)
router.get('/api/v1/hotels/:cod', getHotel)
router.get('/api/v1/hotels/place/:cod', getHotelsForPlace)

router.post('/api/v1/hotels', createHotel)
router.delete('/api/v1/hotels', getHotels)
router.put('/api/v1/hotels/:cod', updateHotel)

export default router;