"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = require("../helpers/HttpError");
const User_1 = require("../modules/auth/User");
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment variables!');
}
const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return next((0, HttpError_1.HttpError)(401, 'Unauthorized: No valid token provided'));
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await User_1.User.findById(id);
        if (!user || !user.token) {
            return next((0, HttpError_1.HttpError)(401, 'Unauthorized: User not found'));
        }
        req.user = user;
        next();
    }
    catch (error) {
        // next(HttpError(401, error.message));
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next((0, HttpError_1.HttpError)(401, 'Unauthorized: Invalid token'));
        }
        next((0, HttpError_1.HttpError)(401, 'Unauthorized: Token verification failed'));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map