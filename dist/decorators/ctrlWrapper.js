"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ctrlWrapper;
function ctrlWrapper(ctrl) {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=ctrlWrapper.js.map