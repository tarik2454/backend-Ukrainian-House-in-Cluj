"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hooks_1 = require("./hooks");
const regex_1 = require("@/constants/regex");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        match: regex_1.emailRegex,
        unique: true,
        required: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { versionKey: false, timestamps: true });
userSchema.post('save', hooks_1.handleSaveError);
userSchema.pre('findOneAndUpdate', hooks_1.preUpdate);
userSchema.post('findOneAndUpdate', hooks_1.handleSaveError);
//# sourceMappingURL=User.js.map