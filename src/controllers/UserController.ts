import { Request, Response } from "express";
import UserService from "../services/UserService";

const userService = new UserService();

class UserController {
  async index(request: Request, response: Response) {
    return await userService.index(request, response);
  }

  async show(request: Request, response: Response) {
    return await userService.show(request, response);
  }

  async showByEmail(request: Request, response: Response) {
    return await userService.showByEmail(request, response);
  }

  async update(request: Request, response: Response) {
    return await userService.update(request, response);
  }

  async updateLocation(request: Request, response: Response) {
    return await userService.updateLocation(request, response);
  }

  async destroy(request: Request, response: Response) {
    return await userService.destroy(request, response);
  }
}

export default UserController;
