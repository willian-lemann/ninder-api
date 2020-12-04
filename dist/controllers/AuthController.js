"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authService = new AuthService_1.default();
class AuthController {
    async Register(request, response) {
        return await authService.Register(request, response);
    }
    async Authenticate(request, response) {
        return await authService.Authenticate(request, response);
    }
}
exports.default = AuthController;
