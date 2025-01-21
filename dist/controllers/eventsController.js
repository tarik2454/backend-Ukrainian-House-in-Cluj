"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const index_1 = require("../db/index");
const getAll = async (req, res) => {
    const result = await (0, index_1.getAllEvents)();
    res.json(result);
};
const getById = async (req, res) => {
    const { id } = req.params;
    const result = await (0, index_1.getOneEvent)(id);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const add = async (req, res) => {
    const result = await (0, index_1.createEvent)(req.body);
    res.status(201).json(result);
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await (0, index_1.updateEvent)({ id, data: req.body });
    if (!result) {
        throw (0, HttpError_1.default)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await (0, index_1.deleteEvent)(id);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Event with id=${id} not found`);
    }
    // res.status(204).send(); // response.body non send;
    res.json({ message: 'Delete successfully' });
};
exports.default = {
    getAll: (0, ctrlWrapper_1.default)(getAll),
    getById: (0, ctrlWrapper_1.default)(getById),
    add: (0, ctrlWrapper_1.default)(add),
    updateById: (0, ctrlWrapper_1.default)(updateById),
    deleteById: (0, ctrlWrapper_1.default)(deleteById),
};
//# sourceMappingURL=eventsController.js.map