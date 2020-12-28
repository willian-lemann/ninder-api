import express from "express";
import mongoose from "mongoose";
import http from "http";
import appConfig from "./config/AppConfig";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({
   path: process.env.NODE_ENV === "dev" ? "src/.env.local" : "src/.env",
});
console.log(process.env.CONNECTION_STRING);
const PORT = process.env.PORT || 3333;

import { WebSocketConfig } from "./config/WebSocket";

const app = express();
const server = new http.Server(app);

WebSocketConfig(server);

mongoose.connect(`${process.env.CONNECTION_STRING}`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

appConfig.forEach((config) => {
   app.use(config);
});

server.listen(PORT);
