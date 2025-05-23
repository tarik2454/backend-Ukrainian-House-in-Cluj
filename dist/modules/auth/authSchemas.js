"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSigninSchema = exports.userSignupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_1 = require("../../constants/regex");
exports.userSignupSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().pattern(regex_1.emailRegex).required().messages({
        'any.required': `"email" must be exist`,
        'string.email': `"email" must be a valid email`,
    }),
    avatarURL: joi_1.default.string(),
    password: joi_1.default.string().min(6).required().messages({
        'any.required': `"password" must be exist`,
        'string.base': `"password" must be string`,
    }),
});
exports.userSigninSchema = joi_1.default.object({
    email: joi_1.default.string().pattern(regex_1.emailRegex).required().messages({
        'any.required': `"email" must be exist`,
        'string.email': `"email" must be a valid email`,
    }),
    password: joi_1.default.string().min(6).required().messages({
        'any.required': `"password" must be exist`,
        'string.base': `"password" must be string`,
    }),
});
//# sourceMappingURL=authSchemas.js.map