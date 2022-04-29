import {Router} from 'express';

import { createCommentHotel, deleteCommentHotel, getComment, getCommentHotels, updateCommentHotel } from '../controllers/comment.hotels.controller';

const router = Router();

router.get('/api/v1/comment/hotels', getComment)
router.get('/api/v1/comment/hotels/:cod', getCommentHotels)

router.post('/api/v1/comment/hotels', createCommentHotel)
router.delete('/api/v1/comment/hotels/:cod', deleteCommentHotel)
router.put('/api/v1/comment/hotels/:cod', updateCommentHotel)

export default router;