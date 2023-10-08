import { deleteCommentById, findCommentById, insertComment, updateCommentById } from './comment.repository';
import { TComment } from './comment.types';

export const createNewComment = async (commentData: TComment, postId: string, authorId: string) => {
  const comment = insertComment(commentData, postId, authorId);
  return comment;
};

export const getCommentById = async (commentId: string) => {
  const post = await findCommentById(commentId);
  return post;
};

export const editComment = async (commentData: TComment, commentId: string) => {
  const comment = updateCommentById(commentData, commentId);
  return comment;
};

export const destroyComment = async (commentId: string) => {
  const comment = deleteCommentById(commentId);
  return comment;
};
