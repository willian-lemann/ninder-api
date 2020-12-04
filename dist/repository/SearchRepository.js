"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class SearchRepository {
    async index(user_id, location) {
        const { latitude, longitude } = location;
        const users = await User_1.default.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
            _id: {
                $ne: user_id,
            },
        });
        return users;
    }
}
exports.default = SearchRepository;
