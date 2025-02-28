"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dbHost = process.env.DB_HOST;
if (!dbHost) {
    throw new Error('Environment variable DB_HOST is not defined');
}
mongoose_1.default
    .connect(dbHost)
    .then(() => {
    app_1.default.listen(process.env.PORT, () => {
        console.log('Server is running. Use our API on port: 3001');
    });
})
    .catch(err => {
    console.log(err.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map