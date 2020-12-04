"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const userService = new UserService_1.default();
class UserController {
    async index(request, response) {
        return await userService.index(request, response);
    }
    async show(request, response) {
        return await userService.show(request, response);
    }
    async showByEmail(request, response) {
        return await userService.showByEmail(request, response);
    }
    async update(request, response) {
        return await userService.update(request, response);
    }
    async updateLocation(request, response) {
        return await userService.updateLocation(request, response);
    }
    async destroy(request, response) {
        return await userService.destroy(request, response);
    }
}
exports.default = UserController;
