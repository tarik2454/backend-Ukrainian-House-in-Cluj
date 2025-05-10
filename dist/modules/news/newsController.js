"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NewsItem_1 = require("../../models/NewsItem");
const HttpError_1 = require("../../helpers/HttpError");
const ctrlWrapper_1 = require("../../decorators/ctrlWrapper");
const getAll = async (req, res) => {
    const result = await NewsItem_1.NewsItem.find({}, '-createdAt -updatedAt');
    res.json(result);
};
const getById = async (req, res) => {
    const { id } = req.params;
    const result = await NewsItem_1.NewsItem.findOne({ _id: id }, '-createdAt -updatedAt');
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const add = async (req, res) => {
    const result = await NewsItem_1.NewsItem.create(req.body);
    res.status(201).json(result);
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await NewsItem_1.NewsItem.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await NewsItem_1.NewsItem.findByIdAndDelete(id);
    if (!result) {
        throw (0, HttpError_1.HttpError)(404, `Event with id=${id} not found`);
    }
    res.json({ message: 'Delete success' });
};
exports.default = {
    getAll: (0, ctrlWrapper_1.ctrlWrapper)(getAll),
    getById: (0, ctrlWrapper_1.ctrlWrapper)(getById),
    add: (0, ctrlWrapper_1.ctrlWrapper)(add),
    updateById: (0, ctrlWrapper_1.ctrlWrapper)(updateById),
    deleteById: (0, ctrlWrapper_1.ctrlWrapper)(deleteById),
};
//# sourceMappingURL=newsController.js.map