"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const Event_1 = require("../../models/Event");
const HttpError_1 = require("@/helpers/HttpError");
const cloudinary_1 = require("@/helpers/cloudinary");
const ctrlWrapper_1 = require("@/decorators/ctrlWrapper");
// const postersEventsPath = path.resolve('public', 'postersEvents');
const getAll = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const result = await Event_1.Event.find({}, {}, { skip, limit });
    res.json(result);
};
const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Event_1.Event.findOne({ _id: id });
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const add = async (req, res) => {
    if (!req.file) {
        throw (0, HttpError_1.HttpError)(400, 'File is missing');
    }
    const { url: poster } = await cloudinary_1.cloudinary.uploader.upload(req.file.path, {
        folder: 'backend-Ukrainian-House-in-Cluj/postersEvents',
    });
    await promises_1.default.unlink(req.file.path);
    // const { path: oldPath, filename } = req.file;
    // const newPath = path.join(postersEventsPath, filename);
    // await fs.rename(oldPath, newPath);
    // const poster = path.join('postersEvents', filename);
    const result = await Event_1.Event.create({ ...req.body, poster });
    res.status(201).json(result);
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Event_1.Event.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Event_1.Event.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Event_1.Event.findByIdAndDelete(id);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    // res.status(204).send(); // response.body non send;
    res.json({ message: 'Delete success' });
};
exports.default = {
    getAll: (0, ctrlWrapper_1.ctrlWrapper)(getAll),
    getById: (0, ctrlWrapper_1.ctrlWrapper)(getById),
    add: (0, ctrlWrapper_1.ctrlWrapper)(add),
    updateById: (0, ctrlWrapper_1.ctrlWrapper)(updateById),
    updateFavorite: (0, ctrlWrapper_1.ctrlWrapper)(updateFavorite),
    deleteById: (0, ctrlWrapper_1.ctrlWrapper)(deleteById),
};
//# sourceMappingURL=eventsController.js.map