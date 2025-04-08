"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const destination = path_1.default.resolve('temp');
const storage = multer_1.default.diskStorage({
    destination,
    filename: (_req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        cb(null, filename);
    },
});
const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
};
const upload = (0, multer_1.default)({
    storage,
    limits,
});
exports.default = upload;
//# sourceMappingURL=upload.js.map