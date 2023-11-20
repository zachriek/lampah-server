import { z } from 'zod';

export const registerSchema = z.object({
	body: z.object({
		email: z.string().email(),
		name: z.string().min(6),
		username: z.string().min(3),
		phone: z.string().min(10),
		password: z.string().min(6),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		username: z.string().min(3),
		password: z.string().min(6),
	}),
});

export const userSchema = z.object({
	body: z.object({
		email: z.string().email(),
		name: z.string().min(6),
		username: z.string().min(3),
		phone: z.string().min(10),
	}),
});

export const imageSchema = z.object({
	image: z.any().refine((file: File) => file?.length !== 0, 'Gambar harus dimasukkan'),
});
