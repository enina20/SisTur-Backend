import {Router} from 'express';

import { createHotel, getHotel, getHotels, getHotelsCopacabana, getHotelsCoroico, getHotelsMadidi, getHotelsSajama, getHotelsTorotoro, getHotelsUyuni, updateHotel } from '../controllers/hotels.controller'

const router = Router();

router.get('/api/v1/hotels', getHotels)
router.get('/api/v1/hotels/uyuni', getHotelsUyuni)
router.get('/api/v1/hotels/coroico', getHotelsCoroico)
router.get('/api/v1/hotels/sajama', getHotelsSajama)
router.get('/api/v1/hotels/copacabana', getHotelsCopacabana)
router.get('/api/v1/hotels/madidi', getHotelsMadidi)
router.get('/api/v1/hotels/torotoro', getHotelsTorotoro)

router.post('/api/v1/hotels', createHotel)
router.get('/api/v1/hotels/:cod', getHotel)
router.delete('/api/v1/hotels', getHotels)
router.put('/api/v1/hotels/:cod', updateHotel)

export default router;