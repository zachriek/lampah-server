import express from 'express';
import { validate } from '../../libs/zod';
import { loginSchema, registerSchema, userSchema } from './user.schema';
import { editProfile, getProfile, login, register } from './user.controller';
import { authenticateToken } from '../../libs/jwt';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.use(authenticateToken);

router.get('/me', getProfile);
router.patch('/me', validate(userSchema), editProfile);

export default router;
