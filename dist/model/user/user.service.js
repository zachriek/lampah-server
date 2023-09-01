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
exports.editUserById = exports.authorizeUser = exports.getUserById = exports.getUserByUsername = exports.createUser = void 0;
const bcrypt_1 = require("../../libs/bcrypt");
const user_repository_1 = require("./user.repository");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield (0, user_repository_1.findUserByUsername)(userData.username);
    if (existingUser)
        throw Error('Username taken');
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(userData.password);
    userData.password = hashedPassword;
    const user = yield (0, user_repository_1.insertUser)(userData);
    return user;
});
exports.createUser = createUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserByUsername)(username);
    if (!user)
        throw Error('Username does not exist');
    return user;
});
exports.getUserByUsername = getUserByUsername;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserById)(id);
    if (!user)
        throw Error('User does not exist');
    return user;
});
exports.getUserById = getUserById;
const authorizeUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUserByUsername)(userData.username);
    if (!user)
        throw Error('Username does not exist');
    const isCorrectPassword = yield (0, bcrypt_1.comparePassword)(userData.password, user.password);
    if (!isCorrectPassword)
        throw Error('Incorrect password');
    return user;
});
exports.authorizeUser = authorizeUser;
const editUserById = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield (0, exports.getUserById)(id);
    if (!findUser)
        throw Error('Username does not exist');
    const user = yield (0, user_repository_1.updateUserById)(id, userData);
    return user;
});
exports.editUserById = editUserById;
