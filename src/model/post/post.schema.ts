import { z } from 'zod';

export const postSchema = z.object({
  body: z.object({
    title: z.string(),
    body: z.string(),
  }),
});
