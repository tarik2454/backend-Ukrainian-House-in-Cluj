"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./authController"));
const validateBody_1 = require("../../decorators/validateBody");
const authSchemas_1 = require("./authSchemas");
const authenticate_1 = require("../../middelwares/authenticate");
const upload_1 = require("../../middelwares/upload");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/signup', upload_1.upload.single('avatarURL'), (0, validateBody_1.validateBody)(authSchemas_1.userSignupSchema), authController_1.default.signup);
authRouter.post('/signin', (0, validateBody_1.validateBody)(authSchemas_1.userSigninSchema), authController_1.default.signin);
authRouter.get('/current', authenticate_1.authenticate, authController_1.default.getCurrent);
authRouter.post('/signout', authenticate_1.authenticate, authController_1.default.signout);
authRouter.get('/verify/:verificationCode', authController_1.default.verifyEmail);
//# sourceMappingURL=authRouter.js.map