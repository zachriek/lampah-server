import { PrismaClient } from '@prisma/client';
import { TPost } from './post.types';
import slug from 'slug';

const prisma = new PrismaClient();

export const findManyPost = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const insertPost = async (postData: TPost, authorId: string) => {
  const { title, body } = postData;

  const post = await prisma.post.create({
    data: { title, slug: slug(title), body, authorId },
  });

  return post;
};

export const findPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({ where: { slug } });
  return post;
};

export const updatePostBySlug = async (postData: TPost, slug: string) => {
  const { title, body } = postData;

  const post = await prisma.post.update({
    where: { slug },
    data: { title, body },
  });

  return post;
};

export const deletePostBySlug = async (slug: string) => {
  const post = await prisma.post.delete({ where: { slug } });
  return post;
};
