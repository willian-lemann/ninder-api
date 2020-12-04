"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_json_1 = require("../config/Auth.json");
module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader)
        return response.status(401).json({ error: 'No token provided.' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return response.status(401).json({ error: 'Token error. Cannot find the "Bearer" string.' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({ error: 'Token malformatted.' });
    jsonwebtoken_1.default.verify(token, Auth_json_1.secret, (error, decoded) => {
        if (error)
            return response.status(401).json({ error: 'Token invalid.' });
        request.body.user_id = decoded.id;
        return next();
    });
};
