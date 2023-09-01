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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostBySlug = exports.updatePostBySlug = exports.findPostBySlug = exports.insertPost = exports.findManyPost = void 0;
const client_1 = require("@prisma/client");
const slug_1 = __importDefault(require("slug"));
const prisma = new client_1.PrismaClient();
const findManyPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany();
    return posts;
});
exports.findManyPost = findManyPost;
const insertPost = (postData, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = postData;
    const post = yield prisma.post.create({
        data: { title, slug: (0, slug_1.default)(title), body, authorId },
    });
    return post;
});
exports.insertPost = insertPost;
const findPostBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.post.findUnique({ where: { slug } });
    return post;
});
exports.findPostBySlug = findPostBySlug;
const updatePostBySlug = (postData, slug) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = postData;
    const post = yield prisma.post.update({
        where: { slug },
        data: { title, body },
    });
    return post;
});
exports.updatePostBySlug = updatePostBySlug;
const deletePostBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.post.delete({ where: { slug } });
    return post;
});
exports.deletePostBySlug = deletePostBySlug;