"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateBody_1 = __importDefault(require("@/decorators/validateBody"));
const authSchemas_1 = require("@/schemas/authSchemas");
const authRouter = express_1.default.Router();
exports.default = authRouter.post('/signup', (0, validateBody_1.default)(authSchemas_1.userSignupSchema));
//# sourceMappingURL=authRouter.js.map