"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const eventsController_1 = __importDefault(require("./eventsController"));
const isValidId_1 = require("../../middelwares/isValidId");
const authenticate_1 = require("../../middelwares/authenticate");
const upload_1 = require("../../middelwares/upload");
const HttpError_1 = require("../../helpers/HttpError");
const validateBody_1 = require("../../decorators/validateBody");
const eventSchemas_1 = require("../../schemas/eventSchemas");
const eventsRouter = express_1.default.Router();
exports.eventsRouter = eventsRouter;
// eventsRouter.use(authenticate);
eventsRouter.get('/', eventsController_1.default.getAll);
eventsRouter.get('/:id', isValidId_1.isValidId, eventsController_1.default.getById);
eventsRouter.post('/', authenticate_1.authenticate, upload_1.upload.single('img'), (req, res, next) => {
    try {
        // Если eventDate передан строкой — парсим
        if (typeof req.body.eventDate === 'string') {
            try {
                req.body.eventDate = JSON.parse(req.body.eventDate);
            }
            catch {
                return next((0, HttpError_1.HttpError)(400, 'Invalid JSON format in eventDate'));
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
                return next((0, HttpError_1.HttpError)(400, 'Invalid JSON format in tags, must be an array'));
            }
        }
        next();
    }
    catch (error) {
        next((0, HttpError_1.HttpError)(400, error));
    }
}, (0, validateBody_1.validateBody)(eventSchemas_1.createEventSchema), eventsController_1.default.add);
eventsRouter.put('/:id', authenticate_1.authenticate, (0, validateBody_1.validateBody)(eventSchemas_1.updateEventSchema), eventsController_1.default.updateById);
eventsRouter.patch('/:id/favorite', authenticate_1.authenticate, isValidId_1.isValidId, (0, validateBody_1.validateBody)(eventSchemas_1.eventUpdateFavoriteSchema), eventsController_1.default.updateFavorite);
eventsRouter.delete('/:id', authenticate_1.authenticate, eventsController_1.default.deleteById);
//# sourceMappingURL=eventsRouter.js.map