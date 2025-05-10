"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrlWrapper = ctrlWrapper;
function ctrlWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=ctrlWrapper.js.map