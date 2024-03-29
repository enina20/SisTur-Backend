import {Router} from 'express';

import { createPlace, getPlaces } from '../controllers/places.controller'

const router = Router();

router.get('/api/v1/places', getPlaces)
router.post('/api/v1/places', createPlace)
router.get('/api/v1/places/:cod', getPlaces)
router.delete('/api/v1/places', getPlaces)
router.put('/api/v1/places', getPlaces)

export default router;