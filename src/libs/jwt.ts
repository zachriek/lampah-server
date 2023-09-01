import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

export const generateAccessToken = (id: string, username: string) => {
  const token = jwt.sign({ id, username }, process.env.SECRET_TOKEN as string, { expiresIn: '1d' });
  return token;
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Invalid token' });

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);
    res.locals.user = decoded;

    next();
  } catch (err: any) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
