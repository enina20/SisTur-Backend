import {Router} from 'express';

import { createRegistration, deleteRegistration, getRegistrationClients, getRegistrationHotels, getRegistrations, updateRegistration } from '../controllers/registration.hotels.controller';

const router = Router();

router.get('/api/v1/registration/hotels', getRegistrations) //Todas las agencias
router.get('/api/v1/registration/hotels/:cod',getRegistrationHotels) //reservacion por agencia
router.get('/api/v1/registration/hotels/client/:cod',getRegistrationClients) //reservacion por persona

router.post('/api/v1/registration/hotels',createRegistration) //hacer una reservacion
router.delete('/api/v1/registration/hotels/:cod',deleteRegistration)
router.put('/api/v1/registration/hotels/:cod',updateRegistration)

export default router;