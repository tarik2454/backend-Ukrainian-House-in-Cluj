"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = __importDefault(require("../controllers/newsController"));
const validateBody_1 = __importDefault(require("../decorators/validateBody"));
const isValidId_1 = __importDefault(require("../middelwares/isValidId"));
const authenticate_1 = __importDefault(require("../middelwares/authenticate"));
const newsItemSchemas_1 = require("../schemas/newsItemSchemas");
const newsRouter = express_1.default.Router();
// newsRouter.use(authenticate);
newsRouter.get('/', newsController_1.default.getAll);
newsRouter.get('/:id', isValidId_1.default, newsController_1.default.getById);
newsRouter.post('/', authenticate_1.default, (0, validateBody_1.default)(newsItemSchemas_1.createNewsItemSchema), newsController_1.default.add);
newsRouter.put('/:id', authenticate_1.default, (0, validateBody_1.default)(newsItemSchemas_1.updateNewsItemSchema), newsController_1.default.updateById);
newsRouter.delete('/:id', authenticate_1.default, newsController_1.default.deleteById);
exports.default = newsRouter;
//# sourceMappingURL=newsRouter.js.map