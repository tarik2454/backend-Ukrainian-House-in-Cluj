"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preUpdate = exports.handleSaveError = void 0;
const handleSaveError = (error, data, next) => {
    (error.status = 400), next();
};
exports.handleSaveError = handleSaveError;
const preUpdate = function (next) {
    this.setOptions({ new: true });
    this.setOptions({ runValidators: true });
    next();
};
exports.preUpdate = preUpdate;
//# sourceMappingURL=hooks.js.map