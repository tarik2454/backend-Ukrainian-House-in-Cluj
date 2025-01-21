"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const DB_HOST = 'mongodb+srv://tarik2454:4tNelyySmiuNs9aS@cluster0.pz8jo.mongodb.net/backend-Ukrainian-House-in-Cluj?retryWrites=true&w=majority&appName=Cluster0';
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    app_1.default.listen(3001, () => {
        console.log('Server is running. Use our API on port: 3001');
    });
})
    .catch(err => {
    console.log(err.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map