"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class AuthRepository {
    async findByEmail(email) {
        const user = await User_1.default.findOne({ email }).select("+password");
        return user;
    }
    async Register(newUser) {
        const createdUser = await User_1.default.create(newUser);
        return createdUser;
    }
}
exports.default = AuthRepository;
