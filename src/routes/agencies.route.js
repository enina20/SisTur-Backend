import {Router} from 'express';

import { createAgency, getAgencies, getAgenciesCoroico, getAgenciesMadidi, getAgenciesSajama, getAgenciesTorotoro, getAgenciesUyuni, getAgency, updateAgency } from '../controllers/agencies.controller'

const router = Router();

router.get('/api/v1/agencies', getAgencies)
router.get('/api/v1/agencies/uyuni', getAgenciesUyuni)
router.get('/api/v1/agencies/coroico', getAgenciesCoroico)
router.get('/api/v1/agencies/sajama', getAgenciesSajama)
router.get('/api/v1/agencies/copacabana', getAgenciesCoroico)
router.get('/api/v1/agencies/madidi', getAgenciesMadidi)
router.get('/api/v1/agencies/torotoro', getAgenciesTorotoro)

router.post('/api/v1/agencies', createAgency)
router.get('/api/v1/agencies/:cod', getAgency)
router.delete('/api/v1/agencies', getAgencies)
router.put('/api/v1/agencies/:cod', updateAgency)

export default router;