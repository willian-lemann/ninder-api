import express from "express";
import mongoose from "mongoose";
import http from "http";
import appConfig from "./config/AppConfig";
import path from "path";

import { WebSocketConfig } from "./config/WebSocket";

const app = express();
const server = new http.Server(app);

WebSocketConfig(server);

mongoose.connect(
   "mongodb+srv://willianlemann:American1995@ninder.ag4q2.mongodb.net/ninder-dev?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
appConfig.forEach((config) => {
   app.use(config);
});

server.listen(3333);
