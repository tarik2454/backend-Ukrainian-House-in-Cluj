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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/api/auth', authRouter_1.default);
app.use('/api/events', eventsRouter_1.default);
app.use('/api/news', newsRouter_1.default);
app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err, req, res, _next) => {
    const { status = 500, message = 'Internal Server Error' } = err;
    res.status(status).json({ error: message });
});
exports.default = app;
//# sourceMappingURL=app.js.map