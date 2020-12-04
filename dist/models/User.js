"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PointSchema_1 = __importDefault(require("./PointSchema"));
const user = {
    image_url: String,
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    telephone: String,
    birthday: String,
    nationality: String,
    location: {
        type: PointSchema_1.default,
        index: "2dsphere",
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
};
const UserSchema = new mongoose_1.Schema(user);
exports.default = mongoose_1.model("User", UserSchema);
