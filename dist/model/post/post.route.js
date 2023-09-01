"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../libs/jwt");
const post_controller_1 = require("./post.controller");
const zod_1 = require("../../libs/zod");
const post_schema_1 = require("./post.schema");
const router = express_1.default.Router();
router.use(jwt_1.authenticateToken);
router.get('/', post_controller_1.getAllPost);
router.post('/', (0, zod_1.validate)(post_schema_1.postSchema), post_controller_1.createPost);
router.get('/:slug', post_controller_1.getPost);
router.patch('/:slug', (0, zod_1.validate)(post_schema_1.postSchema), post_controller_1.updatePost);
router.delete('/:slug', post_controller_1.deletePost);
exports.default = router;
