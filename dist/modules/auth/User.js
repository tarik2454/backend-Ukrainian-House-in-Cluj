"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const modelsHook_1 = require("../../hooks/modelsHook");
const regex_1 = require("../../constants/regex");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: regex_1.emailRegex,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    avatarURL: { type: String },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    // role: {
    //   type: String,
    //   enum: ['user', 'admin'],
    //   default: 'user',
    // },
}, { versionKey: false, timestamps: true });
userSchema.post('save', modelsHook_1.handleSaveError);
userSchema.pre('findOneAndUpdate', modelsHook_1.preUpdate);
userSchema.post('findOneAndUpdate', modelsHook_1.handleSaveError);
const User = (0, mongoose_1.model)('user', userSchema);
exports.User = User;
//# sourceMappingURL=User.js.map