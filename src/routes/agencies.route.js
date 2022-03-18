import {Router} from 'express';

import { getAgencies } from '../controllers/agencies.controller'

const router = Router();

router.get('/api/v1/agencies', getAgencies)
router.post('/api/v1/agencies', getAgencies)
router.get('/api/v1/agencies/:cod', getAgencies)
router.delete('/api/v1/agencies', getAgencies)
router.put('/api/v1/agencies', getAgencies)

export default router;