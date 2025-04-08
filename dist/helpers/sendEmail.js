"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;
if (!UKR_NET_EMAIL || !UKR_NET_PASSWORD) {
    throw new Error('Missing UKR_NET_EMAIL or UKR_NET_PASSWORD in environment variables.');
}
const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    },
};
const transport = nodemailer_1.default.createTransport(nodemailerConfig);
const sendEmail = (data) => {
    const email = { ...data, from: UKR_NET_EMAIL };
    return transport.sendMail(email);
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map