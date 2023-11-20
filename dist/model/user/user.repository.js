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
exports.updateImageById = exports.updateUserById = exports.findUserById = exports.findUserByUsername = exports.insertUser = exports.selectAuthor = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = require("../../libs/cloudinary");
const prisma = new client_1.PrismaClient();
exports.selectAuthor = { id: true, name: true, username: true, email: true, phone: true, role: true };
const insertUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, phone, password } = userData;
    const user = yield prisma.user.create({
        data: { name, username, email, phone, password },
    });
    return user;
});
exports.insertUser = insertUser;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { username } });
    return user;
});
exports.findUserByUsername = findUserByUsername;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { id } });
    return user;
});
exports.findUserById = findUserById;
const updateUserById = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = userData;
    const user = yield prisma.user.update({ where: { id }, data: { name, username: userData.username, email, phone } });
    return user;
});
exports.updateUserById = updateUserById;
const updateImageById = (id, image) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, cloudinary_1.cloudinaryUpload)(image);
    yield prisma.user.update({
        where: { id },
        data: { image: result.secure_url },
    });
    return result;
});
exports.updateImageById = updateImageById;
