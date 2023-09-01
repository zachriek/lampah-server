import { Request, Response } from 'express';
import { authorizeUser, createUser, editUserById, getUserById } from './user.service';
import { generateAccessToken } from '../../libs/jwt';
import { handleError } from '../../libs/error';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    const { name, username, email, phone } = user;

    return res.status(200).json({
      data: { name, username, email, phone },
      message: 'User successfully register!',
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
      message: 'User successfully login!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(res.locals.user.id);

    const { name, username, email, phone } = user;

    return res.status(200).json({
      data: { name, username, email, phone },
      message: 'User',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const user = await editUserById(res.locals.user.id, req.body);

    const { name, username, email, phone } = user;

    return res.status(200).json({
      data: { name, username, email, phone },
      message: 'User successfully updated!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};