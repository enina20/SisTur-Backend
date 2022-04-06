import {Router} from 'express';

import { createTourPackage, getTourPackage, getTourPackages, getTourPackagesForPlace, updateTourPackage } from '../controllers/tour-packages.controller'

const router = Router();

router.get('/api/v1/tour-packages', getTourPackages)
router.get('/api/v1/tour-packages/:cod', getTourPackage)
router.get('/api/v1/tour-packages/place/:cod', getTourPackagesForPlace)

router.post('/api/v1/tour-packages', createTourPackage)
router.delete('/api/v1/tour-packages', updateTourPackage)
router.put('/api/v1/tour-packages/:cod', updateTourPackage)

export default router;