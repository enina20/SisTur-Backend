import {Router} from 'express';

import { createManager, getManagers } from '../controllers/managers.controller'

const router = Router();

router.get('/api/v1/managers', getManagers)
router.post('/api/v1/managers', createManager)
router.get('/api/v1/managers/:id', getManagers)
router.delete('/api/v1/managers', getManagers)
router.put('/api/v1/managers', getManagers)

export default router;