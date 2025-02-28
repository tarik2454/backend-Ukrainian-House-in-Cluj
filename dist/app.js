"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const eventsRouter_1 = __importDefault(require("./routes/eventsRouter"));
const newsRouter_1 = __importDefault(require("./routes/newsRouter"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
const multer = require('multer');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRouter_1.default);
app.use('/api/events', eventsRouter_1.default);
app.use('/api/news', newsRouter_1.default);
// import db from './db/events.json' assert { type: 'json' };
// app.get('/', (req, res) => {
//   res.json(db);
// });
app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});
exports.default = app;
//# sourceMappingURL=app.js.map