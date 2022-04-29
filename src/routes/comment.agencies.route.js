import {Router} from 'express';

import { createCommentAgency, deleteCommentAgency, getComment, getCommentAgencies, updateCommentAgency } from '../controllers/comment.agencies.controller';

const router = Router();

router.get('/api/v1/comment/agencies', getComment)
router.get('/api/v1/comment/agencies/:cod', getCommentAgencies)

router.post('/api/v1/comment/agencies', createCommentAgency)
router.put('/api/v1/comment/agencies/:cod', updateCommentAgency)
router.delete('/api/v1/comment/agencies/:cod', deleteCommentAgency)

export default router;