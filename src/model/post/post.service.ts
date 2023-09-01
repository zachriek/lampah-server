import { deletePostBySlug, findManyPost, findPostBySlug, insertPost, updatePostBySlug } from './post.repository';
import { TPost } from './post.types';

export const getPosts = async () => {
  const posts = await findManyPost();
  return posts;
};

export const createNewPost = async (postData: TPost, authorId: string) => {
  const post = await insertPost(postData, authorId);
  return post;
};

export const getPostBySlug = async (slug: string) => {
  const post = await findPostBySlug(slug);
  return post;
};

export const editPostBySlug = async (postData: TPost, slug: string) => {
  const post = await updatePostBySlug(postData, slug);
  return post;
};

export const destroyPostBySlug = async (slug: string) => {
  const post = await deletePostBySlug(slug);
  return post;
};
