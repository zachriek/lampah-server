import express from 'express';
import userRoute from '../model/user/user.route';
import postRoute from '../model/post/post.route';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/post', postRoute);

export default router;
