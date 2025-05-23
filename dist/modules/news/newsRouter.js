"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const express_1 = __importDefault(require("express"));
const newsController_1 = __importDefault(require("./newsController"));
const isValidId_1 = require("../../middelwares/isValidId");
const authenticate_1 = require("../../middelwares/authenticate");
const newsItemSchemas_1 = require("./newsItemSchemas");
const validateBody_1 = require("../../decorators/validateBody");
const newsRouter = express_1.default.Router();
exports.newsRouter = newsRouter;
// newsRouter.use(authenticate);
newsRouter.get('/', newsController_1.default.getAll);
newsRouter.get('/:id', isValidId_1.isValidId, newsController_1.default.getById);
newsRouter.post('/', authenticate_1.authenticate, (0, validateBody_1.validateBody)(newsItemSchemas_1.createNewsItemSchema), newsController_1.default.add);
newsRouter.put('/:id', authenticate_1.authenticate, (0, validateBody_1.validateBody)(newsItemSchemas_1.updateNewsItemSchema), newsController_1.default.updateById);
newsRouter.delete('/:id', authenticate_1.authenticate, newsController_1.default.deleteById);
//# sourceMappingURL=newsRouter.js.map