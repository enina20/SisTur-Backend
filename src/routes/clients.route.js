import {Router} from 'express';

import { createClient, getClients } from '../controllers/clients.controller'

const router = Router();

router.get('/api/v1/clients', getClients)
router.post('/api/v1/clients', createClient)
router.get('/api/v1/clients/:id', getClients)
router.delete('/api/v1/clients', getClients)
router.put('/api/v1/clients', getClients)

export default router;