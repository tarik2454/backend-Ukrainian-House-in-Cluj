"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventsController_1 = __importDefault(require("../controllers/eventsController"));
const validateBody_1 = __importDefault(require("../decorators/validateBody"));
const isValidId_1 = __importDefault(require("../middelwares/isValidId"));
const eventSchemas_1 = require("../schemas/eventSchemas");
const eventsRouter = express_1.default.Router();
eventsRouter.get('/', eventsController_1.default.getAll);
eventsRouter.get('/:id', isValidId_1.default, eventsController_1.default.getById);
eventsRouter.post('/', (0, validateBody_1.default)(eventSchemas_1.createEventSchema), eventsController_1.default.add);
eventsRouter.put('/:id', (0, validateBody_1.default)(eventSchemas_1.updateEventSchema), eventsController_1.default.updateById);
eventsRouter.patch('/:id/favorite', isValidId_1.default, (0, validateBody_1.default)(eventSchemas_1.eventUpdateFavoriteSchema), eventsController_1.default.updateFavorite);
eventsRouter.delete('/:id', eventsController_1.default.deleteById);
exports.default = eventsRouter;
//# sourceMappingURL=eventsRouter.js.map