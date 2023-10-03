import { deleteCommentById, insertComment, updateCommentById } from './comment.repository';
import { TComment } from './comment.types';

export const createNewComment = async (commentData: TComment, postId: string, authorId: string) => {
  const comment = insertComment(commentData, postId, authorId);
  return comment;
};

export const editComment = async (commentData: TComment, commentId: string) => {
  const comment = updateCommentById(commentData, commentId);
  return comment;
};

export const destroyComment = async (commentId: string) => {
  const comment = deleteCommentById(commentId);
  return comment;
};
