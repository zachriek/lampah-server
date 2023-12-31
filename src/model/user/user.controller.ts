import { Request, Response } from 'express';
import { authorizeUser, createUser, editUserById, getUserById, uploadImageById } from './user.service';
import { generateAccessToken } from '../../libs/jwt';
import { handleError } from '../../libs/error';
import { uploadImage } from '../post/post.service';

export const register = async (req: Request, res: Response) => {
	try {
		const user = await createUser(req.body);
		const { name, username, email, phone } = user;

		return res.status(200).json({
			data: { name, username, email, phone },
			message: 'Berhasil mendaftar!',
		});
	} catch (err: any) {
		return handleError(res, err.message);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const user = await authorizeUser(req.body);
		const { id, name, username, email, phone } = user;
		const token = generateAccessToken(id, username);

		return res.status(200).json({
			data: { name, username, email, phone, token },
			message: 'Berhasil masuk!',
		});
	} catch (err: any) {
		return handleError(res, err.message);
	}
};

export const getProfile = async (req: Request, res: Response) => {
	try {
		const user = await getUserById(res.locals.user.id);

		const { id, name, username, email, phone, role, image } = user;

		return res.status(200).json({
			data: { id, name, username, email, phone, role, image },
			message: 'User',
		});
	} catch (err: any) {
		return handleError(res, err.message);
	}
};

export const editProfile = async (req: Request, res: Response) => {
	try {
		const user = await editUserById(res.locals.user.id, req.body);

		const { name, username, email, phone, image } = user;

		return res.status(200).json({
			data: { name, username, email, phone, image },
			message: 'Berhasil memperbarui profil!',
		});
	} catch (err: any) {
		return handleError(res, err.message);
	}
};

export const editImage = async (req: Request, res: Response) => {
	try {
		if (!req.files) {
			res.status(400).json({
				error: 'Gambar harus dimasukkan',
			});
		}
		const { image } = req.files as any;
		const userImage = await uploadImageById(res.locals.user.id, image.tempFilePath);

		return res.status(200).json({
			data: { image: userImage.secure_url },
			message: 'Berhasil memperbarui gambar profil!',
		});
	} catch (err: any) {
		return handleError(res, err.message);
	}
};
