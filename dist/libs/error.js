"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({ error: message });
};
exports.handleError = handleError;
