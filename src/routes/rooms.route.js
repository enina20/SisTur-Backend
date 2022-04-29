import {Router} from 'express';

import { createRoom, deleteRoom, getRooms, getRoomsHotel, updateRoom } from '../controllers/rooms.controller'

const router = Router();

router.get('/api/v1/rooms', getRooms)
router.get('/api/v1/rooms/:cod', getRoomsHotel)

router.post('/api/v1/rooms', createRoom)
router.delete('/api/v1/rooms/:cod', deleteRoom)
router.put('/api/v1/rooms/:cod', updateRoom)

export default router;