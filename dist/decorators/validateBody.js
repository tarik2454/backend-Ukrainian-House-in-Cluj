"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateBody;
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
function validateBody(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return next((0, HttpError_1.default)(400, error.message));
        }
        next();
    };
}
//# sourceMappingURL=validateBody.js.map