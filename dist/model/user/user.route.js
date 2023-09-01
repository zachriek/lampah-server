"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("../../libs/zod");
const user_schema_1 = require("./user.schema");
const user_controller_1 = require("./user.controller");
const jwt_1 = require("../../libs/jwt");
const router = express_1.default.Router();
router.post('/register', (0, zod_1.validate)(user_schema_1.registerSchema), user_controller_1.register);
router.post('/login', (0, zod_1.validate)(user_schema_1.loginSchema), user_controller_1.login);
router.use(jwt_1.authenticateToken);
router.get('/me', user_controller_1.getProfile);
router.patch('/me', (0, zod_1.validate)(user_schema_1.userSchema), user_controller_1.editProfile);
exports.default = router;
