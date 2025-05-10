"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const HttpError_1 = require("../helpers/HttpError");
function validateBody(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return next((0, HttpError_1.HttpError)(400, error.message));
        }
        next();
    };
}
//# sourceMappingURL=validateBody.js.map