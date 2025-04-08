"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventsController_1 = __importDefault(require("../controllers/eventsController"));
const validateBody_1 = __importDefault(require("../decorators/validateBody"));
const isValidId_1 = __importDefault(require("../middelwares/isValidId"));
const authenticate_1 = __importDefault(require("../middelwares/authenticate"));
const upload_1 = __importDefault(require("../middelwares/upload"));
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const eventSchemas_1 = require("../schemas/eventSchemas");
const eventsRouter = express_1.default.Router();
// eventsRouter.use(authenticate);
eventsRouter.get('/', eventsController_1.default.getAll);
eventsRouter.get('/:id', isValidId_1.default, eventsController_1.default.getById);
eventsRouter.post('/', authenticate_1.default, upload_1.default.single('img'), (req, res, next) => {
    try {
        // Если eventDate передан строкой — парсим
        if (typeof req.body.eventDate === 'string') {
            try {
                req.body.eventDate = JSON.parse(req.body.eventDate);
            }
            catch {
                return next((0, HttpError_1.default)(400, 'Invalid JSON format in eventDate'));
            }
        }
        // Если tags передан строкой — парсим
        if (typeof req.body.tags === 'string') {
            try {
                req.body.tags = JSON.parse(req.body.tags);
                if (!Array.isArray(req.body.tags)) {
                    throw new Error();
                }
            }
            catch {
                return next((0, HttpError_1.default)(400, 'Invalid JSON format in tags, must be an array'));
            }
        }
        next();
    }
    catch (error) {
        next((0, HttpError_1.default)(400, error));
    }
}, (0, validateBody_1.default)(eventSchemas_1.createEventSchema), eventsController_1.default.add);
eventsRouter.put('/:id', authenticate_1.default, (0, validateBody_1.default)(eventSchemas_1.updateEventSchema), eventsController_1.default.updateById);
eventsRouter.patch('/:id/favorite', authenticate_1.default, isValidId_1.default, (0, validateBody_1.default)(eventSchemas_1.eventUpdateFavoriteSchema), eventsController_1.default.updateFavorite);
eventsRouter.delete('/:id', authenticate_1.default, eventsController_1.default.deleteById);
exports.default = eventsRouter;
//# sourceMappingURL=eventsRouter.js.map