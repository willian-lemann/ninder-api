import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret, expiresIn } from "../config/Auth.json";

import AuthRepository from "../repository/AuthRepository";

const authRepository = new AuthRepository();

interface tokenParams {
   id: number;
}

const GenerateToken = (params: tokenParams) => { 
   return jwt.sign({ id: params.id }, secret, {
      expiresIn,
   });
};

class AuthService {
   async Register(request: Request, response: Response) {
      const { email } = request.body;
      const newUser = request.body;
      const image = request.file as Express.Multer.File;

      try {
         const userExists = await authRepository.findByEmail(email);

         if (userExists)
            return response.status(400).json({ error: "User already exists." });

         const hash = await bcrypt.hash(newUser.password, 10);

         newUser.password = hash;

         const location = {
            type: "Point",
            coordinates: [0, 0],
         };

         const data = {
            ...newUser,
            image_url: image.filename,
            location,
         };

         const registeredUser = await authRepository.Register(data);

         newUser.password = undefined;

         const token = GenerateToken({ id: registeredUser._id });

         return response.json({
            newUser,
            token,
         });
      } catch (error) {
         return response.status(400).json({ error: "Registration failed." });
      }
   }

   async Authenticate(request: Request, response: Response) {
      const { email, password } = request.body;

      const user = await authRepository.findByEmail(email);

      if (!user) return response.status(400).json({ error: "User not found." });

      const isCompared = await bcrypt.compare(
         String(password),
         String(user.password)
      );

      if (!isCompared)
         return response.status(400).json({ error: "Invalid password." });

      user.password = undefined;

      const token = GenerateToken({ id: user._id });

      return response.status(200).json({
         user,
         token,
      });
   }
}

export default AuthService;
