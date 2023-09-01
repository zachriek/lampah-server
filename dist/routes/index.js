"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../model/user/user.route"));
const post_route_1 = __importDefault(require("../model/post/post.route"));
const router = express_1.default.Router();
router.use('/auth', user_route_1.default);
router.use('/post', post_route_1.default);
exports.default = router;
