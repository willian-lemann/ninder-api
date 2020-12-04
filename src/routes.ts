import { Router } from "express";
import RouteGroup from "./config/RouteConfig";
import multer from "multer";
import uploadConfig from "./config/upload";

import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";
import SearchController from "./controllers/SearchController";

import AuthMiddleware from "./middlewares/AuthMiddleware";

const authController = new AuthController();
const userController = new UserController();
const searchController = new SearchController();

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/auth/authenticate", authController.Authenticate);
routes.post("/auth/register", upload.single("image"), authController.Register);

routes.get("/users/email", userController.showByEmail);
routes.patch("/users/:id", userController.updateLocation);

RouteGroup([
   {
      routes,
      resource: "/users",
      controller: userController,
      middleware: [AuthMiddleware],
      except: ["store"],
   },
   {
      routes,
      resource: "/search",
      controller: searchController,
      middleware: [AuthMiddleware],
      except: ["show", "store", "update", "destroy"],
   },
]);

export default routes;
