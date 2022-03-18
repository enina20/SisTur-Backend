import {Router} from 'express';

import { getUsers, createUser } from '../controllers/users.controller'

const router = Router();

router.get('/api/v1/users', getUsers)
router.post('/api/v1/users', createUser)
router.get('/api/v1/users/:id', getUsers)
router.delete('/api/v1/users', getUsers)
router.put('/api/v1/users', getUsers)

export default router;