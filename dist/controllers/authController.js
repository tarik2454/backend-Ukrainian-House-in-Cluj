"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment variables!');
}
const signup = async (req, res, next) => {
    const { email, password } = req.body;
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw (0, HttpError_1.default)(409, 'Email already in use');
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await User_1.default.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw (0, HttpError_1.default)(401, 'Email or password is invalid');
    }
    const passwordCompare = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, HttpError_1.default)(401, 'Email or password is invalid');
    }
    const payload = {
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    res.json({ token });
};
exports.default = {
    signup: (0, ctrlWrapper_1.default)(signup),
    signin: (0, ctrlWrapper_1.default)(signin),
};
//# sourceMappingURL=authController.js.map