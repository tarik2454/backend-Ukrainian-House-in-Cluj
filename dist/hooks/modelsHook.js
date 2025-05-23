"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preUpdate = exports.handleSaveError = void 0;
const handleSaveError = (error, data, next) => {
    const { name, code } = error;
    error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
    next();
};
exports.handleSaveError = handleSaveError;
const preUpdate = function (next) {
    this.setOptions({ new: true });
    this.setOptions({ runValidators: true });
    next();
};
exports.preUpdate = preUpdate;
//# sourceMappingURL=modelsHook.js.map