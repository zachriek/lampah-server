import { Request, Response } from 'express';
import { handleError } from '../../libs/error';
import { createNewPost, destroyPostBySlug, editPostBySlug, getPostBySlug, getPosts } from './post.service';

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();

    return res.status(200).json({
      data: posts,
      message: 'Posts',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await createNewPost(req.body, res.locals.user.id);

    return res.status(200).json({
      data: post,
      message: 'Post successfully created!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return handleError(res, 'Post not found', 404);

    return res.status(200).json({
      data: post,
      message: 'Post',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const findPost = await getPostBySlug(req.params.slug);
    if (!findPost) return handleError(res, 'Post not found', 404);

    const post = await editPostBySlug(req.body, req.params.slug);

    return res.status(200).json({
      data: post,
      message: 'Post successfully updated!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const findPost = await getPostBySlug(req.params.slug);
    if (!findPost) return handleError(res, 'Post not found', 404);

    const post = await destroyPostBySlug(req.params.slug);

    return res.status(200).json({
      data: post,
      message: 'Post successfully deleted!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};
