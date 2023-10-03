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
exports.deleteCommentById = exports.updateCommentById = exports.insertComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertComment = (commentData, postId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment } = commentData;
    const newComment = yield prisma.comment.create({
        data: { comment, postId, authorId },
    });
    return newComment;
});
exports.insertComment = insertComment;
const updateCommentById = (commentData, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment } = commentData;
    const newComment = yield prisma.comment.update({
        where: { id: commentId },
        data: { comment },
    });
    return newComment;
});
exports.updateCommentById = updateCommentById;
const deleteCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prisma.comment.delete({
        where: { id: commentId },
    });
    return comment;
});
exports.deleteCommentById = deleteCommentById;
