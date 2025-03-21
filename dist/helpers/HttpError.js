"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
const messageList = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
};
exports.default = HttpError;
//# sourceMappingURL=HttpError.js.map