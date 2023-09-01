"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const generateAccessToken = (id, username) => {
    const token = jsonwebtoken_1.default.sign({ id, username }, process.env.SECRET_TOKEN, { expiresIn: '1d' });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return res.status(401).json({ error: 'Invalid token' });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        res.locals.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
