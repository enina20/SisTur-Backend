import {Router} from 'express';

import { createManager, getManager, getManagers } from '../controllers/managers.controller'

const router = Router();

router.get('/api/v1/managers', getManagers)
router.get('/api/v1/managers/:cod', getManager)

router.post('/api/v1/managers', createManager)
router.delete('/api/v1/managers', getManagers)
router.put('/api/v1/managers', getManagers)

export default router;