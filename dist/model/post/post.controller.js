"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getAllPost = void 0;
const error_1 = require("../../libs/error");
const post_service_1 = require("./post.service");
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_service_1.getPosts)();
        return res.status(200).json({
            data: posts,
            message: 'Posts',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.getAllPost = getAllPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = req.body;
        if (req.files) {
            const { image } = req.files;
            const postImage = yield (0, post_service_1.uploadImage)(image.tempFilePath);
            postData.image = postImage.secure_url;
        }
        const post = yield (0, post_service_1.createNewPost)(postData, res.locals.user.id);
        return res.status(200).json({
            data: post,
            message: 'Laporan berhasil dibuat!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.createPost = createPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, post_service_1.getPostBySlug)(req.params.slug);
        if (!post)
            return (0, error_1.handleError)(res, 'Post not found', 404);
        return res.status(200).json({
            data: post,
            message: 'Post',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findPost = yield (0, post_service_1.getPostBySlug)(req.params.slug);
        if (!findPost)
            return (0, error_1.handleError)(res, 'Laporan tidak ditemukan!', 404);
        if (findPost.authorId !== res.locals.user.id)
            return (0, error_1.handleError)(res, 'Laporan tidak bisa diubah!', 400);
        const post = yield (0, post_service_1.editPostBySlug)(req.body, req.params.slug);
        return res.status(200).json({
            data: post,
            message: 'Laporan berhasil diperbarui!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findPost = yield (0, post_service_1.getPostBySlug)(req.params.slug);
        if (!findPost)
            return (0, error_1.handleError)(res, 'Laporan tidak ditemukan!', 404);
        if (findPost.authorId !== res.locals.user.id)
            return (0, error_1.handleError)(res, 'Laporan tidak bisa dihapus!', 400);
        const post = yield (0, post_service_1.destroyPostById)(findPost.id);
        return res.status(200).json({
            data: post,
            message: 'Laporan berhasil dihapus!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.deletePost = deletePost;
