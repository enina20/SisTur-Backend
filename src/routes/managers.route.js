import {Router} from 'express';

import { createManager, deleteManager, getManager, getManagers, getRequestManagers, updateManager, updateRequestManagers } from '../controllers/managers.controller'

const router = Router();

router.get('/api/v1/managers', getManagers)
router.get('/api/v1/managers/:cod', getManager)

router.post('/api/v1/managers', createManager)
router.delete('/api/v1/managers', deleteManager)
router.put('/api/v1/managers', updateManager)

router.get('/api/v1/request/managers', getRequestManagers)
router.put('/api/v1/request/managers/:cod', updateRequestManagers)

export default router;