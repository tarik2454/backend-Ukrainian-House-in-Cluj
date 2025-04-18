"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const validateBody_1 = __importDefault(require("../decorators/validateBody"));
const authSchemas_1 = require("../schemas/authSchemas");
const authenticate_1 = __importDefault(require("../middelwares/authenticate"));
const authRouter = express_1.default.Router();
authRouter.post('/signup', (0, validateBody_1.default)(authSchemas_1.userSignupSchema), authController_1.default.signup);
authRouter.post('/signin', (0, validateBody_1.default)(authSchemas_1.userSigninSchema), authController_1.default.signin);
authRouter.get('/current', authenticate_1.default, authController_1.default.getCurrent);
authRouter.post('/signout', authenticate_1.default, authController_1.default.signout);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map