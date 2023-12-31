import { Request, Response } from 'express';
import { handleError } from '../../libs/error';
import { createNewPost, destroyPostById, editPostBySlug, getPostBySlug, getPosts, uploadImage } from './post.service';

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
    const postData = req.body;

    if (req.files) {
      const { image } = req.files as any;
      const postImage = await uploadImage(image.tempFilePath);
      postData.image = postImage.secure_url;
    }

    const post = await createNewPost(postData, res.locals.user.id);

    return res.status(200).json({
      data: post,
      message: 'Laporan berhasil dibuat!',
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
    if (!findPost) return handleError(res, 'Laporan tidak ditemukan!', 404);
    if (findPost.authorId !== res.locals.user.id) return handleError(res, 'Laporan tidak bisa diubah!', 400);

    const post = await editPostBySlug(req.body, req.params.slug);

    return res.status(200).json({
      data: post,
      message: 'Laporan berhasil diperbarui!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const findPost = await getPostBySlug(req.params.slug);
    if (!findPost) return handleError(res, 'Laporan tidak ditemukan!', 404);
    if (findPost.authorId !== res.locals.user.id) return handleError(res, 'Laporan tidak bisa dihapus!', 400);

    const post = await destroyPostById(findPost.id);

    return res.status(200).json({
      data: post,
      message: 'Laporan berhasil dihapus!',
    });
  } catch (err: any) {
    return handleError(res, err.message);
  }
};
