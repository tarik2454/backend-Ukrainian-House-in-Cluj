"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const modelsHook_1 = require("../../hooks/modelsHook");
const tags_1 = require("../../constants/tags");
const regex_1 = require("../../constants/regex");
const eventSchema = new mongoose_1.Schema({
    publicationDate: {
        type: String,
        match: regex_1.publicationDateRegex,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    poster: { type: String },
    description: {
        type: String,
        required: true,
    },
    eventDate: {
        type: {
            date: { type: String, match: regex_1.publicationDateRegex },
            time: { type: String },
            location: { type: String },
        },
    },
    registration: {
        type: Boolean,
        default: false,
        required: true,
    },
    tags: {
        type: [String],
        enum: tags_1.tags,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });
eventSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});
eventSchema.post('save', modelsHook_1.handleSaveError);
eventSchema.pre('findOneAndUpdate', modelsHook_1.preUpdate);
eventSchema.post('findOneAndUpdate', modelsHook_1.handleSaveError);
const Event = (0, mongoose_1.model)('event', eventSchema);
exports.Event = Event;
//# sourceMappingURL=Event.js.map