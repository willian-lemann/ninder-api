"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket_1 = require("../config/WebSocket");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const User_1 = __importDefault(require("../models/User"));
const userRepository = new UserRepository_1.default();
class UserService {
    async index(request, response) {
        const users = await User_1.default.find();
        return response.json(users);
    }
    async show(request, response) {
        const { id } = request.params;
        const user = await userRepository.show(id);
        if (!user)
            return response.status(404).json({ message: "User not found." });
        return response.status(200).json(user);
    }
    async showByEmail(request, response) {
        const { email } = request.query;
        const user = await userRepository.showByEmail(String(email));
        if (!user) {
            return response.status(404).json({ message: "User not found." });
        }
        return response.status(200).json(user);
    }
    async update(request, response) {
        const { id } = request.params;
        const data = request.body;
        const user = await userRepository.show(id);
        if (!user)
            return response.status(404).json("User not found.");
        await userRepository.update(id, data);
        return response.status(201).json({ message: "User updated." });
    }
    async updateLocation(request, response) {
        const { id } = request.params;
        const data = request.body;
        const { location: { latitude, longitude }, } = data;
        const location = {
            type: "Point",
            coordinates: [longitude, latitude],
        };
        const userUpdated = await userRepository.updateLocation(id, location);
        if (!userUpdated)
            return response.status(400).json({ message: "Error in update user." });
        const user = await userRepository.show(id);
        const filteredConnections = WebSocket_1.FindConnections({ latitude, longitude });
        WebSocket_1.ToClient(filteredConnections, "user", user);
        return response.status(201).json(user);
    }
    async destroy(request, response) {
        const { id } = request.params;
        const user = await userRepository.show(id);
        if (!user)
            response.status(404).json({ message: "Usuario não encontrado." });
        const removedUser = await userRepository.destroy(id);
        if (!removedUser)
            return response
                .status(404)
                .json({ message: "Erro ao deletar usuario." });
        response.status(204).json();
    }
}
exports.default = UserService;
