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
exports.uploadImage = exports.destroyPostById = exports.editPostBySlug = exports.getPostBySlug = exports.createNewPost = exports.getPosts = void 0;
const post_repository_1 = require("./post.repository");
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield (0, post_repository_1.findManyPost)();
    return posts;
});
exports.getPosts = getPosts;
const createNewPost = (postData, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_repository_1.insertPost)(postData, authorId);
    return post;
});
exports.createNewPost = createNewPost;
const getPostBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_repository_1.findPostBySlug)(slug);
    return post;
});
exports.getPostBySlug = getPostBySlug;
const editPostBySlug = (postData, slug) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_repository_1.updatePostBySlug)(postData, slug);
    return post;
});
exports.editPostBySlug = editPostBySlug;
const destroyPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield (0, post_repository_1.deletePostById)(id);
    return post;
});
exports.destroyPostById = destroyPostById;
const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_repository_1.uploadPhotoFile)(image);
    return result;
});
exports.uploadImage = uploadImage;
