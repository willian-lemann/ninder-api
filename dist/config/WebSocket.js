"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToClient = exports.FindConnections = exports.WebSocketConfig = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const calculateDistance_1 = __importDefault(require("../utils/calculateDistance"));
const connections = [];
let io;
const WebSocketConfig = (server) => {
    io = socket_io_1.default(server);
    io.on('connection', socket => {
        const { latitude, longitude } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            }
        });
    });
};
exports.WebSocketConfig = WebSocketConfig;
const FindConnections = (coordinates) => {
    return connections === null || connections === void 0 ? void 0 : connections.filter(connection => {
        return calculateDistance_1.default(coordinates, connection.coordinates) < 10;
    });
};
exports.FindConnections = FindConnections;
const ToClient = (to, message, data) => {
    to.forEach((connection) => {
        io.to(connection.id).emit(message, data);
    });
};
exports.ToClient = ToClient;
