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
exports.destroyComment = exports.editComment = exports.getCommentById = exports.createNewComment = void 0;
const comment_repository_1 = require("./comment.repository");
const createNewComment = (commentData, postId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = (0, comment_repository_1.insertComment)(commentData, postId, authorId);
    return comment;
});
exports.createNewComment = createNewComment;
const getCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, comment_repository_1.findCommentById)(commentId);
    return post;
});
exports.getCommentById = getCommentById;
const editComment = (commentData, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = (0, comment_repository_1.updateCommentById)(commentData, commentId);
    return comment;
});
exports.editComment = editComment;
const destroyComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = (0, comment_repository_1.deleteCommentById)(commentId);
    return comment;
});
exports.destroyComment = destroyComment;
