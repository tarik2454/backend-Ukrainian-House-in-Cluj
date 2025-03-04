"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const signup = async (req, res, next) => { };
exports.default = {
    getAll: (0, ctrlWrapper_1.default)(signup),
};
//# sourceMappingURL=authController.js.map