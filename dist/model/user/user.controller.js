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
exports.editProfile = exports.getProfile = exports.login = exports.register = void 0;
const user_service_1 = require("./user.service");
const jwt_1 = require("../../libs/jwt");
const error_1 = require("../../libs/error");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
        const { name, username, email, phone } = user;
        return res.status(200).json({
            data: { name, username, email, phone },
            message: 'Berhasil mendaftar!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.authorizeUser)(req.body);
        const { id, name, username, email, phone } = user;
        const token = (0, jwt_1.generateAccessToken)(id, username);
        return res.status(200).json({
            data: { name, username, email, phone, token },
            message: 'Berhasil masuk!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUserById)(res.locals.user.id);
        const { name, username, email, phone, role } = user;
        return res.status(200).json({
            data: { name, username, email, phone, role },
            message: 'User',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.getProfile = getProfile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.editUserById)(res.locals.user.id, req.body);
        const { name, username, email, phone } = user;
        return res.status(200).json({
            data: { name, username, email, phone },
            message: 'Berhasil memperbarui profil!',
        });
    }
    catch (err) {
        return (0, error_1.handleError)(res, err.message);
    }
});
exports.editProfile = editProfile;
