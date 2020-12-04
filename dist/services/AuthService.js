"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_json_1 = require("../config/Auth.json");
const AuthRepository_1 = __importDefault(require("../repository/AuthRepository"));
const authRepository = new AuthRepository_1.default();
const GenerateToken = (params) => {
    return jsonwebtoken_1.default.sign(params, Auth_json_1.secret, {
        expiresIn: Auth_json_1.expiresIn,
    });
};
class AuthService {
    async Register(request, response) {
        const { email } = request.body;
        const newUser = request.body;
        const image = request.file;
        try {
            const userExists = await authRepository.findByEmail(email);
            if (userExists)
                return response.status(400).json({ error: "User already exists." });
            const hash = await bcrypt_1.default.hash(newUser.password, 10);
            newUser.password = hash;
            const location = {
                type: "Point",
                coordinates: [0, 0],
            };
            const data = Object.assign(Object.assign({}, newUser), { image_url: image.filename, location });
            console.log(data);
            await authRepository.Register(data);
            newUser.password = undefined;
            const token = GenerateToken({ id: newUser.id });
            return response.json({
                newUser,
                token,
            });
        }
        catch (error) {
            return response.status(400).json({ error: "Registration failed." });
        }
    }
    async Authenticate(request, response) {
        const { email, password } = request.body;
        const user = await authRepository.findByEmail(email);
        if (!user)
            return response.status(400).json({ error: "User not found." });
        const isCompared = await bcrypt_1.default.compare(String(password), String(user.password));
        if (!isCompared)
            return response.status(400).json({ error: "Invalid password." });
        user.password = undefined;
        const token = GenerateToken({ id: Number(user.id) });
        return response.status(200).json({
            user,
            token,
        });
    }
}
exports.default = AuthService;
