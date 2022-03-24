import {Router} from 'express';

import { getAgencies, getAgenciesCoroico, getAgenciesMadidi, getAgenciesSajama, getAgenciesTorotoro, getAgenciesUyuni } from '../controllers/agencies.controller'

const router = Router();

router.get('/api/v1/agencies', getAgencies)
router.get('/api/v1/agencies/uyuni', getAgenciesUyuni)
router.get('/api/v1/agencies/coroico', getAgenciesCoroico)
router.get('/api/v1/agencies/sajama', getAgenciesSajama)
router.get('/api/v1/agencies/copacabana', getAgenciesCoroico)
router.get('/api/v1/agencies/madidi', getAgenciesMadidi)
router.get('/api/v1/agencies/torotoro', getAgenciesTorotoro)

router.post('/api/v1/agencies', getAgencies)
router.get('/api/v1/agencies/:cod', getAgencies)
router.delete('/api/v1/agencies', getAgencies)
router.put('/api/v1/agencies', getAgencies)

export default router;