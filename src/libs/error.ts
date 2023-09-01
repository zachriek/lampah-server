import { Response } from 'express';

export const handleError = (res: Response, message: string, statusCode: number = 400) => {
  return res.status(statusCode).json({ error: message });
};
