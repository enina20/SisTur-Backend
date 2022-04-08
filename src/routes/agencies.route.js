import {Router} from 'express';

import { createAgency, deleteAgency, getAgencies, getAgenciesForPlace, getAgency, updateAgency } from '../controllers/agencies.controller'

const router = Router();

router.get('/api/v1/agencies', getAgencies)
router.get('/api/v1/agencies/:cod', getAgency)
router.get('/api/v1/agencies/place/:cod', getAgenciesForPlace)

router.post('/api/v1/agencies', createAgency)
router.delete('/api/v1/agencies/:cod', deleteAgency)
router.put('/api/v1/agencies/:cod', updateAgency)

export default router;