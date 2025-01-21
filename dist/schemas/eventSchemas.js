"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEventSchema = joi_1.default.object({
    publicationDate: joi_1.default.date().required(),
    title: joi_1.default.string().required(),
    img: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    eventDate: joi_1.default.object({
        date: joi_1.default.string(),
        time: joi_1.default.string(),
        location: joi_1.default.string(),
    }),
    registration: joi_1.default.boolean().required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.updateEventSchema = joi_1.default.object({
    publicationDate: joi_1.default.date(),
    title: joi_1.default.string(),
    img: joi_1.default.string(),
    description: joi_1.default.string(),
    eventDate: joi_1.default.object({
        date: joi_1.default.string(),
        time: joi_1.default.string(),
        location: joi_1.default.string(),
    }),
    registration: joi_1.default.boolean(),
    tags: joi_1.default.array().items(joi_1.default.string()),
});
//# sourceMappingURL=eventSchemas.js.map