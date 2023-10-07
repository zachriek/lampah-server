import { PrismaClient } from '@prisma/client';
import { TPost } from './post.types';
import slug from 'slug';
import { cloudinaryUpload } from '../../libs/cloudinary';

const prisma = new PrismaClient();

const selectAuthor = { name: true, username: true, email: true, phone: true, role: true };

export const findManyPost = async () => {
  const posts = await prisma.post.findMany({ include: { author: { select: selectAuthor } } });
  return posts;
};

export const insertPost = async (postData: TPost, authorId: string) => {
  const { title, body, image } = postData;

  const post = await prisma.post.create({
    data: { title, slug: slug(title), body, image, authorId },
  });

  return post;
};

export const findPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      comments: {
        include: {
          author: { select: selectAuthor },
        },
      },
      author: { select: selectAuthor },
    },
  });
  return post;
};

export const updatePostBySlug = async (postData: TPost, slug: string) => {
  const { title, body, image } = postData;

  const post = await prisma.post.update({
    where: { slug },
    data: { title, body, image },
  });

  return post;
};

export const deletePostById = async (id: string) => {
  await prisma.post.update({ where: { id }, data: { comments: { deleteMany: { postId: id } } } });
  const post = await prisma.post.delete({ where: { id } });
  return post;
};

export const uploadPhotoFile = async (image: string) => {
  const result = await cloudinaryUpload(image);
  return result;
};
