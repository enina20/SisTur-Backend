import {Router} from 'express';

import { createRegistration, getRegistrations } from '../controllers/registrations.controller'

const router = Router();

router.get('/api/v1/registrations', getRegistrations)
router.post('/api/v1/registrations', createRegistration)
router.get('/api/v1/registrations/:id', getRegistrations)
router.delete('/api/v1/registrations', getRegistrations)
router.put('/api/v1/registrations', getRegistrations)

export default router;