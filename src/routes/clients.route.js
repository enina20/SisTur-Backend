import {Router} from 'express';

import { createClient, getClient, getClients, updateClient } from '../controllers/clients.controller'

const router = Router();

router.get('/api/v1/clients', getClients)
router.get('/api/v1/clients/:cod', getClient)

router.post('/api/v1/clients', createClient)
router.delete('/api/v1/clients', getClients)
router.put('/api/v1/clients/:cod', updateClient)

export default router;