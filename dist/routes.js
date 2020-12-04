"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouteConfig_1 = __importDefault(require("./config/RouteConfig"));
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("./config/upload"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const SearchController_1 = __importDefault(require("./controllers/SearchController"));
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const authController = new AuthController_1.default();
const userController = new UserController_1.default();
const searchController = new SearchController_1.default();
const routes = express_1.Router();
const upload = multer_1.default(upload_1.default);
routes.post("/auth/authenticate", authController.Authenticate);
routes.post("/auth/register", upload.single("image"), authController.Register);
routes.get("/users/email", userController.showByEmail);
routes.patch("/users/:id", userController.updateLocation);
RouteConfig_1.default([
    {
        routes,
        resource: "/users",
        controller: userController,
        middleware: [AuthMiddleware_1.default],
        except: ["store"],
    },
    {
        routes,
        resource: "/search",
        controller: searchController,
        middleware: [AuthMiddleware_1.default],
        except: ["show", "store", "update", "destroy"],
    },
]);
exports.default = routes;
