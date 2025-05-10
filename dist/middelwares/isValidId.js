"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = isValidId;
const mongoose_1 = require("mongoose");
const HttpError_1 = require("../helpers/HttpError");
function isValidId(req, res, next) {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next((0, HttpError_1.HttpError)(404, `${id} is not a valid id`));
    }
    next();
}
//# sourceMappingURL=isValidId.js.map