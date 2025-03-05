"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next((0, HttpError_1.default)(404, `${id} is not a valid id`));
    }
    next();
};
exports.default = isValidId;
//# sourceMappingURL=isValidId.js.map