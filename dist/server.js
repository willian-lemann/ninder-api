"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const AppConfig_1 = __importDefault(require("./config/AppConfig"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3333;
const WebSocket_1 = require("./config/WebSocket");
const app = express_1.default();
const server = new http_1.default.Server(app);
WebSocket_1.WebSocketConfig(server);
mongoose_1.default.connect("mongodb+srv://willianlemann:American1995@ninder.ag4q2.mongodb.net/ninder-dev?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
AppConfig_1.default.forEach((config) => {
    app.use(config);
});
server.listen(PORT);
