import {Router} from 'express';

import { createRegistration, deleteRegistration, getRegistrationAgencies, getRegistrationClients, getRegistrations, updateRegistration } from '../controllers/registration.agencies.controller';

const router = Router();

router.get('/api/v1/registration/agencies', getRegistrations) //Todas las agencias
router.get('/api/v1/registration/agencies/:cod', getRegistrationAgencies) //reservacion por agencia
router.get('/api/v1/registration/agencies/client/:cod', getRegistrationClients) //reservacion por persona

router.post('/api/v1/registration/agencies', createRegistration) //hacer una reservacion
router.delete('/api/v1/registration/agencies/:cod', deleteRegistration)
router.put('/api/v1/registration/agencies/:cod', updateRegistration)

export default router;