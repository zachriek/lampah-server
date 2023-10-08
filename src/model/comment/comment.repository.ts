import { PrismaClient } from '@prisma/client';
import { TComment } from './comment.types';
import { selectAuthor } from '../user/user.repository';

const prisma = new PrismaClient();

export const insertComment = async (commentData: TComment, postId: string, authorId: string) => {
  const { comment } = commentData;

  const newComment = await prisma.comment.create({
    data: { comment, postId, authorId },
  });

  return newComment;
};

export const findCommentById = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  return comment;
};

export const updateCommentById = async (commentData: TComment, commentId: string) => {
  const { comment } = commentData;

  const newComment = await prisma.comment.update({
    where: { id: commentId },
    data: { comment },
  });

  return newComment;
};

export const deleteCommentById = async (commentId: string) => {
  const comment = await prisma.comment.delete({
    where: { id: commentId },
  });

  return comment;
};
