"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../libs/jwt");
const zod_1 = require("../../libs/zod");
const comment_schema_1 = require("./comment.schema");
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.use(jwt_1.authenticateToken);
router.post('/:postId', (0, zod_1.validate)(comment_schema_1.commentSchema), comment_controller_1.createComment);
router.patch('/:commentId', (0, zod_1.validate)(comment_schema_1.commentSchema), comment_controller_1.updateComment);
router.delete('/:commentId', comment_controller_1.deleteComment);
exports.default = router;
