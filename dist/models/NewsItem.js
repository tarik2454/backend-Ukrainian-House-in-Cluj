"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hooks_1 = require("./hooks");
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
newsItemSchema.post('save', hooks_1.handleSaveError);
newsItemSchema.pre('findOneAndUpdate', hooks_1.preUpdate);
newsItemSchema.post('findOneAndUpdate', hooks_1.handleSaveError);
const News = (0, mongoose_1.model)('news', newsItemSchema);
exports.default = News;
//# sourceMappingURL=NewsItem.js.map