import {Router} from 'express';

import { createRoom, getRoom, getRooms, getRoomsForPlace, updateRoom } from '../controllers/rooms.controller'

const router = Router();

router.get('/api/v1/rooms', getRooms)
router.get('/api/v1/rooms/:cod', getRoom)
router.get('/api/v1/rooms/place/:cod', getRoomsForPlace)

router.post('/api/v1/rooms', createRoom)
router.delete('/api/v1/rooms', getRoom)
router.put('/api/v1/rooms/:cod', updateRoom)

export default router;