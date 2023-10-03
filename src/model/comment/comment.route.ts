import express from 'express';
import { authenticateToken } from '../../libs/jwt';
import { validate } from '../../libs/zod';
import { commentSchema } from './comment.schema';
import { createComment, deleteComment, updateComment } from './comment.controller';

const router = express.Router();

router.use(authenticateToken);

router.post('/:postId', validate(commentSchema), createComment);
router.patch('/:commentId', validate(commentSchema), updateComment);
router.delete('/:commentId', deleteComment);

export default router;
