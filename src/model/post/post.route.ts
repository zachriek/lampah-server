import express from 'express';
import { authenticateToken } from '../../libs/jwt';
import { createPost, deletePost, getAllPost, getPost, updatePost } from './post.controller';
import { validate } from '../../libs/zod';
import { postSchema } from './post.schema';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getAllPost);
router.post('/', validate(postSchema), createPost);
router.get('/:slug', getPost);
router.patch('/:slug', validate(postSchema), updatePost);
router.delete('/:slug', deletePost);

export default router;
