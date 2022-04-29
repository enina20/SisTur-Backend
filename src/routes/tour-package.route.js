import {Router} from 'express';

import { createTourPackage, deleteTourPackage, getTourPackageAgency, getTourPackages, getTourPackagesForPlace, updateTourPackage } from '../controllers/tour-packages.controller'

const router = Router();

router.get('/api/v1/tour-packages', getTourPackages)
router.get('/api/v1/tour-packages/:cod', getTourPackageAgency)

router.post('/api/v1/tour-packages', createTourPackage)
router.delete('/api/v1/tour-packages/:cod', deleteTourPackage)
router.put('/api/v1/tour-packages/:cod', updateTourPackage)

export default router;