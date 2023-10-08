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
exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const comment_service_1 = require("./comment.service");
const error_1 = require("../../libs/error");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comment = yield (0, comment_service_1.createNewComment)(req.body, postId, res.locals.user.id);
        return res.status(200).json({
            data: comment,
            message: 'Komentar berhasil dibuat!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.createComment = createComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const findComment = yield (0, comment_service_1.getCommentById)(commentId);
        if (!findComment)
            return (0, error_1.handleError)(res, 'Komentar tidak ditemukan!', 404);
        if (findComment.authorId !== res.locals.user.id)
            return (0, error_1.handleError)(res, 'Komentar tidak bisa diubah!', 400);
        const comment = yield (0, comment_service_1.editComment)(req.body, commentId);
        return res.status(200).json({
            data: comment,
            message: 'Komentar berhasil diperbarui!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const findComment = yield (0, comment_service_1.getCommentById)(commentId);
        if (!findComment)
            return (0, error_1.handleError)(res, 'Komentar tidak ditemukan!', 404);
        if (findComment.authorId !== res.locals.user.id)
            return (0, error_1.handleError)(res, 'Komentar tidak bisa dihapus!', 400);
        const comment = yield (0, comment_service_1.destroyComment)(commentId);
        return res.status(200).json({
            data: comment,
            message: 'Komentar berhasil dihapus!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.deleteComment = deleteComment;
