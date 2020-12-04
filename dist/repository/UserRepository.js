"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class UserRepository {
    async index() {
        const users = await User_1.default.find();
        return users;
    }
    async show(id) {
        const user = await User_1.default.findById(id);
        return user;
    }
    async showByEmail(email) {
        const user = await User_1.default.findOne({ email });
        return user;
    }
    async update(id, data) {
        const updatedUser = await User_1.default.updateOne({ _id: id }, data);
        return updatedUser;
    }
    async updateLocation(id, location) {
        const updatedUser = await User_1.default.updateOne({ _id: id }, { location });
        return updatedUser;
    }
    async destroy(id) {
        const user = await User_1.default.findById(id);
        await User_1.default.remove({ _id: id });
        return user;
    }
}
exports.default = UserRepository;
