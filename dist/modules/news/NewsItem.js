"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsItem = void 0;
const mongoose_1 = require("mongoose");
const modelsHook_1 = require("@/hooks/modelsHook");
const regex_1 = require("@/constants/regex");
const newsItemSchema = new mongoose_1.Schema({
    publicationDate: {
        type: String,
        match: regex_1.publicationDateRegex,
        required: true,
    },
    title: { type: String, required: true },
    img: { type: String },
    description: { type: String, required: true },
}, { versionKey: false, timestamps: true });
newsItemSchema.post('save', modelsHook_1.handleSaveError);
newsItemSchema.pre('findOneAndUpdate', modelsHook_1.preUpdate);
newsItemSchema.post('findOneAndUpdate', modelsHook_1.handleSaveError);
const NewsItem = (0, mongoose_1.model)('news', newsItemSchema);
exports.NewsItem = NewsItem;
//# sourceMappingURL=NewsItem.js.map