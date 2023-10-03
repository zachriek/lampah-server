import { z } from 'zod';

export const commentSchema = z.object({
  body: z.object({
    comment: z.string(),
  }),
});
