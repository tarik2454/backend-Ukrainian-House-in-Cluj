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
const User_1 = require("./User");
const HttpError_1 = require("../../helpers/HttpError");
const sendEmail_1 = require("../../helpers/sendEmail");
const ctrlWrapper_1 = require("../../decorators/ctrlWrapper");
const { JWT_SECRET, BASE_URL_LOCAL } = process.env;
const avatarPath = path_1.default.resolve('tmp', 'avatars');
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment variables!');
}
const signup = async (req, res) => {
    const { email, password } = req.body;
    let avatarURL;
    const existingUser = await User_1.User.findOne({ email });
    if (existingUser) {
        throw (0, HttpError_1.HttpError)(409, 'Email already in use');
    }
    if (req.file) {
        const { path: oldPath, filename } = req.file;
        const newPath = path_1.default.join(avatarPath, filename);
        await promises_1.default.mkdir(avatarPath, { recursive: true });
        await promises_1.default.rename(oldPath, newPath);
        avatarURL = path_1.default.join('avatars', filename);
    }
    else {
        avatarURL = gravatar_1.default.url(email, { s: '250', d: 'retro' });
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const verificationCode = (0, nanoid_1.nanoid)();
    const newUser = await User_1.User.create({
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
    await (0, sendEmail_1.sendEmail)(verifyEmail);
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        avatarURL: newUser.avatarURL,
    });
};
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.User.findOne({ email });
    if (!user) {
        throw (0, HttpError_1.HttpError)(401, 'Email or password is invalid');
    }
    if (!user.verify) {
        throw (0, HttpError_1.HttpError)(401, 'Email not verified');
    }
    const passwordCompare = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, HttpError_1.HttpError)(401, 'Email or password is invalid');
    }
    const payload = {
        id: user.id,
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    await User_1.User.findByIdAndUpdate(user._id, { token });
    res.json({ token });
};
const getCurrent = async (req, res) => {
    if (!req.user) {
        throw (0, HttpError_1.HttpError)(401, 'Not authorized');
    }
    const { username, email } = req.user;
    res.json({ username, email });
};
const signout = async (req, res) => {
    if (!req.user) {
        throw (0, HttpError_1.HttpError)(401, 'Not authorized');
    }
    const { _id } = req.user;
    await User_1.User.findByIdAndUpdate(_id, { token: '' });
    res.json({
        message: 'Signout successful',
    });
};
const verifyEmail = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User_1.User.findOne({ verificationCode });
    if (!user) {
        throw (0, HttpError_1.HttpError)(404, 'Verification code not valid');
    }
    user.verify = true;
    user.verificationCode = '';
    await user.save();
    res.status(200).json({
        message: 'Email successfully verified!',
    });
};
exports.default = {
    signup: (0, ctrlWrapper_1.ctrlWrapper)(signup),
    signin: (0, ctrlWrapper_1.ctrlWrapper)(signin),
    getCurrent: (0, ctrlWrapper_1.ctrlWrapper)(getCurrent),
    signout: (0, ctrlWrapper_1.ctrlWrapper)(signout),
    verifyEmail: (0, ctrlWrapper_1.ctrlWrapper)(verifyEmail),
};
//# sourceMappingURL=authController.js.map