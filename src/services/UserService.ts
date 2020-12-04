import { Request, Response } from "express";
import { FindConnections, ToClient } from "../config/WebSocket";

import UserRepository from "../repository/UserRepository";
import User from "../models/User";

const userRepository = new UserRepository();

class UserService {
   async index(request: Request, response: Response) {
      const users = await User.find();
      return response.json(users);
   }

   async show(request: Request, response: Response) {
      const { id } = request.params;
      const user = await userRepository.show(id);

      if (!user)
         return response.status(404).json({ message: "User not found." });

      return response.status(200).json(user);
   }

   async showByEmail(request: Request, response: Response) {
      const { email } = request.query;
      const user = await userRepository.showByEmail(String(email));

      if (!user) {
         return response.status(404).json({ message: "User not found." });
      }

      return response.status(200).json(user);
   }

   async update(request: Request, response: Response) {
      const { id } = request.params;
      const data = request.body;

      const user = await userRepository.show(id);

      if (!user) return response.status(404).json("User not found.");

      await userRepository.update(id, data);

      return response.status(201).json({ message: "User updated." });
   }

   async updateLocation(request: Request, response: Response) {
      const { id } = request.params;
      const data = request.body;

      const {
         location: { latitude, longitude },
      } = data;

      const location = {
         type: "Point",
         coordinates: [longitude, latitude],
      };

      const userUpdated = await userRepository.updateLocation(id, location);

      if (!userUpdated)
         return response.status(400).json({ message: "Error in update user." });

      const user = await userRepository.show(id);

      const filteredConnections = FindConnections({ latitude, longitude });

      ToClient(filteredConnections, "user", user);

      return response.status(201).json(user);
   }

   async destroy(request: Request, response: Response) {
      const { id } = request.params;

      const user = await userRepository.show(id);

      if (!user)
         response.status(404).json({ message: "Usuario não encontrado." });

      const removedUser = await userRepository.destroy(id);

      if (!removedUser)
         return response
            .status(404)
            .json({ message: "Erro ao deletar usuario." });

      response.status(204).json();
   }
}

export default UserService;
