"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const gravatar_1 = __importDefault(require("gravatar"));
const promises_1 = __importDefault(require("fs/promises"));
const nanoid_1 = require("nanoid");
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
const { JWT_SECRET, BASE_URL_LOCAL } = process.env;
const avatarPath = path_1.default.resolve('public', 'avatars');
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment variables!');
}
const signup = async (req, res) => {
    const { email, password } = req.body;
    let avatarURL;
    if (req.file) {
        const { path: oldPath, filename } = req.file;
        const newPath = path_1.default.join(avatarPath, filename);
        await promises_1.default.rename(oldPath, newPath);
        avatarURL = path_1.default.join('avatars', filename);
    }
    else {
        avatarURL = gravatar_1.default.url(email, { s: '250', d: 'retro' });
    }
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw (0, HttpError_1.default)(409, 'Email already in use');
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const verificationCode = (0, nanoid_1.nanoid)();
    const newUser = await User_1.default.create({
        ...req.body,
        password: hashPassword,
        verificationCode,
        avatarURL,
    });
    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL_LOCAL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`,
    };
    await (0, sendEmail_1.default)(verifyEmail);
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        avatarURL: newUser.avatarURL,
    });
};
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw (0, HttpError_1.default)(401, 'Email or password is invalid');
    }
    if (!user.verify) {
        throw (0, HttpError_1.default)(401, 'Email not verified');
    }
    const passwordCompare = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, HttpError_1.default)(401, 'Email or password is invalid');
    }
    const payload = {
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    await User_1.default.findByIdAndUpdate(user._id, { token });
    res.json({ token });
};
const getCurrent = async (req, res) => {
    if (!req.user) {
        throw (0, HttpError_1.default)(401, 'Not authorized');
    }
    const { username, email } = req.user;
    res.json({ username, email });
};
const signout = async (req, res) => {
    if (!req.user) {
        throw (0, HttpError_1.default)(401, 'Not authorized');
    }
    const { _id } = req.user;
    await User_1.default.findByIdAndUpdate(_id, { token: '' });
    res.json({
        message: 'Signout successful',
    });
};
exports.default = {
    signup: (0, ctrlWrapper_1.default)(signup),
    signin: (0, ctrlWrapper_1.default)(signin),
    getCurrent: (0, ctrlWrapper_1.default)(getCurrent),
    signout: (0, ctrlWrapper_1.default)(signout),
};
//# sourceMappingURL=authController.js.map