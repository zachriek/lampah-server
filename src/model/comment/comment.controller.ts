import { Request, Response } from 'express';
import { createNewComment, destroyComment, editComment } from './comment.service';
import { handleError } from '../../libs/error';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comment = await createNewComment(req.body, postId, res.locals.user.id);

    return res.status(200).json({
      data: comment,
      message: 'Comment successfully created!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await editComment(req.body, commentId);

    return res.status(200).json({
      data: comment,
      message: 'Comment successfully updated!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await destroyComment(commentId);

    return res.status(200).json({
      data: comment,
      message: 'Comment successfully deleted!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};
