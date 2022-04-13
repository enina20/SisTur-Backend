import {Router} from 'express';

import { createReservation, deleteReservation, getReservationClients, getReservationHotels, getReservations, updateReservation } from '../controllers/reservation.hotels.controller';

const router = Router();

router.get('/api/v1/reservation/hotels', getReservations) //Todas las agencias
router.get('/api/v1/reservation/hotels/:cod', getReservationHotels) //reservacion por agencia
router.get('/api/v1/reservation/hotels/client/:cod', getReservationClients) //reservacion por persona

router.post('/api/v1/reservation/hotel', createReservation) //hacer una reservacion
router.delete('/api/v1/reservation/hotel/:cod', deleteReservation)
router.put('/api/v1/reservation/hotel/:cod', updateReservation)

export default router;