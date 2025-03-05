"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventUpdateFavoriteSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const tags_1 = require("../constants/tags");
const regex_1 = require("../constants/regex");
exports.createEventSchema = joi_1.default.object({
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
    eventDate: joi_1.default.object({
        date: joi_1.default.string(),
        time: joi_1.default.string(),
        location: joi_1.default.string(),
    }),
    registration: joi_1.default.boolean().required(),
    tags: joi_1.default.array()
        .items(joi_1.default.string().valid(...tags_1.tags))
        .required()
        .messages({
        'any.required': `"tags" must be exist`,
        'array.includes': `"tags" contains an invalid value`,
    }),
    favorite: joi_1.default.boolean(),
});
exports.updateEventSchema = joi_1.default.object({
    publicationDate: joi_1.default.string(),
    title: joi_1.default.string().messages({ 'string.base': `"title" must be string` }),
    img: joi_1.default.string(),
    description: joi_1.default.string(),
    eventDate: joi_1.default.object({
        date: joi_1.default.string(),
        time: joi_1.default.string(),
        location: joi_1.default.string(),
    }),
    registration: joi_1.default.boolean(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    favorite: joi_1.default.boolean(),
});
exports.eventUpdateFavoriteSchema = joi_1.default.object({
    favorite: joi_1.default.boolean().required(),
});
//# sourceMappingURL=eventSchemas.js.map