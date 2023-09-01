import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map((e) => ({
        [e.path[1]]: `${e.path[1]} ${e.path[0] === 'body' ? 'field' : e.path[0]} is ${e.message.toLowerCase()}`,
      }));
      return res.status(400).json({ errors });
    }
  }
};
