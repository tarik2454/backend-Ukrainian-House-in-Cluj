"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNewsItemSchema = exports.createNewsItemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_1 = require("../constants/regex");
exports.createNewsItemSchema = joi_1.default.object({
    publicationDate: joi_1.default.string()
        .pattern(regex_1.publicationDateRegex)
        .required()
        .messages({
        'any.required': `"date" must be exist`,
        'string.pattern.base': `"date" must match the format DD-MM-YYYY`,
    }),
    title: joi_1.default.string().required().messages({
        'any.required': `"title" must be exist`,
        'string.base': `"title" must be string`,
    }),
    img: joi_1.default.string(),
    description: joi_1.default.string()
        .required()
        .messages({ 'any.required': `"description" must be exist` }),
});
exports.updateNewsItemSchema = joi_1.default.object({
    publicationDate: joi_1.default.string(),
    title: joi_1.default.string().messages({ 'string.base': `"title" must be string` }),
    img: joi_1.default.string(),
    description: joi_1.default.string(),
});
//# sourceMappingURL=newsItemSchemas.js.map