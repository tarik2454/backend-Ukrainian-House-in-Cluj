import HttpError from '../helpers/HttpError.ts';
import ctrlWrapper from '../decorators/ctrlWrapper.ts';
import { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent, } from '../db/index.js';
const getAll = async (req, res) => {
    const result = await getAllEvents();
    res.json(result);
};
const getById = async (req, res) => {
    const { id } = req.params;
    const result = await getOneEvent(id);
    if (!result) {
        throw HttpError(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const add = async (req, res) => {
    const result = await createEvent(req.body);
    res.status(201).json(result);
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await updateEvent({ id, data: req.body });
    if (!result) {
        throw HttpError(404, `Event with id=${id} not found`);
    }
    res.json(result);
};
const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await deleteEvent(id);
    if (!result) {
        throw HttpError(404, `Event with id=${id} not found`);
    }
    // res.status(204).send(); // response.body non send;
    res.json({ message: 'Delete successfully' });
};
export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
};
