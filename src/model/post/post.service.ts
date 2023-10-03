import { deletePostById, findManyPost, findPostBySlug, insertPost, updatePostBySlug, uploadPhotoFile } from './post.repository';
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

export const destroyPostById = async (id: string) => {
  const post = await deletePostById(id);
  return post;
};

export const uploadImage = async (image: string) => {
  const result = await uploadPhotoFile(image);
  return result;
};
