import express from 'express';
import userRoute from '../model/user/user.route';
import postRoute from '../model/post/post.route';
import commentRoute from '../model/comment/comment.route';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

export default router;
