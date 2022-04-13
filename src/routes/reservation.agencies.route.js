import {Router} from 'express';
import { createReservation, deleteReservation, getReservationAgencies, getReservationClients, getReservations, updateReservation } from '../controllers/reservation.agencies.controller';


const router = Router();

router.get('/api/v1/reservation/agencies', getReservations) //Todas las agencias
router.get('/api/v1/reservation/agencies/:cod', getReservationAgencies) //reservacion por agencia
router.get('/api/v1/reservation/agencies/client/:cod', getReservationClients) //reservacion por persona

router.post('/api/v1/reservation/agency', createReservation) //hacer una reservacion
router.delete('/api/v1/reservation/agency/:cod', deleteReservation)
router.put('/api/v1/reservation/agency/:cod', updateReservation)

export default router;