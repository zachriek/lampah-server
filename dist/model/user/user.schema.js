"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSchema = exports.userSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string().min(6),
        username: zod_1.z.string().min(3),
        phone: zod_1.z.string().min(10),
        password: zod_1.z.string().min(6),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(3),
        password: zod_1.z.string().min(6),
    }),
});
exports.userSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string().min(6),
        username: zod_1.z.string().min(3),
        phone: zod_1.z.string().min(10),
    }),
});
exports.imageSchema = zod_1.z.object({
    image: zod_1.z.any().refine((file) => (file === null || file === void 0 ? void 0 : file.length) !== 0, 'Gambar harus dimasukkan'),
});
