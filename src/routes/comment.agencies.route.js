import {Router} from 'express';

import { createCommentAgency, deleteCommentAgency, getCommentAgencies, updateCommentAgency } from '../controllers/comment.agencies.controller';

const router = Router();

router.get('/api/v1/comment/agencies/:cod', getCommentAgencies)

router.post('/api/v1/comment/agencies', createCommentAgency)
router.delete('/api/v1/comment/agencies/:cod', deleteCommentAgency)
router.put('/api/v1/comment/agencies/:cod', updateCommentAgency)

export default router;