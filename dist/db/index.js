"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getOneEvent = exports.getAllEvents = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const nanoid_1 = require("nanoid");
const path_1 = __importDefault(require("path"));
const eventsPath = path_1.default.resolve('db', 'events.json');
const updateEvents = async (events) => {
    await promises_1.default.writeFile(eventsPath, JSON.stringify(events, null, 2));
};
const getAllEvents = async () => {
    const data = await promises_1.default.readFile(eventsPath, 'utf8');
    return JSON.parse(data);
};
exports.getAllEvents = getAllEvents;
const getOneEvent = async (id) => {
    const events = await (0, exports.getAllEvents)();
    const result = events.find(event => event.id === id);
    return result || null;
};
exports.getOneEvent = getOneEvent;
const createEvent = async (body) => {
    const events = await (0, exports.getAllEvents)();
    const newEvent = {
        id: (0, nanoid_1.nanoid)(),
        ...body,
    };
    events.push(newEvent);
    await updateEvents(events);
    return newEvent;
};
exports.createEvent = createEvent;
const updateEvent = async ({ id, data, }) => {
    const events = await (0, exports.getAllEvents)();
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
        return null;
    }
    events[index] = { ...events[index], ...data };
    await updateEvents(events);
    return events[index];
};
exports.updateEvent = updateEvent;
const deleteEvent = async (id) => {
    const events = await (0, exports.getAllEvents)();
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = events.splice(index, 1);
    await updateEvents(events);
    return result;
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=index.js.map