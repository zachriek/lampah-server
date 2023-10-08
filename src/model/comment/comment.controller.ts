import { Request, Response } from 'express';
import { createNewComment, destroyComment, editComment, getCommentById } from './comment.service';
import { handleError } from '../../libs/error';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comment = await createNewComment(req.body, postId, res.locals.user.id);

    return res.status(200).json({
      data: comment,
      message: 'Komentar berhasil dibuat!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const findComment = await getCommentById(commentId);
    if (!findComment) return handleError(res, 'Komentar tidak ditemukan!', 404);
    if (findComment.authorId !== res.locals.user.id) return handleError(res, 'Komentar tidak bisa diubah!', 400);

    const comment = await editComment(req.body, commentId);

    return res.status(200).json({
      data: comment,
      message: 'Komentar berhasil diperbarui!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const findComment = await getCommentById(commentId);
    if (!findComment) return handleError(res, 'Komentar tidak ditemukan!', 404);
    if (findComment.authorId !== res.locals.user.id) return handleError(res, 'Komentar tidak bisa dihapus!', 400);

    const comment = await destroyComment(commentId);

    return res.status(200).json({
      data: comment,
      message: 'Komentar berhasil dihapus!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};
