import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { secret } from '../config/Auth.json';

export = (request: Request, response: Response, next: NextFunction) => {
   const authHeader = request.headers.authorization;

   if (!authHeader)
      return response.status(401).json({ error: 'No token provided.' });

   const parts = authHeader.split(' ');

   if (parts.length !== 2)
      return response.status(401).json({ error: 'Token error. Cannot find the "Bearer" string.' });


   const [scheme, token] = parts;

   if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: 'Token malformatted.' });

   jwt.verify(token, secret, (error: JsonWebTokenError | null, decoded: any) => {
      if (error)
         return response.status(401).json({ error: 'Token invalid.' });

      console.log(decoded.id)
      request.body.user_id = decoded.id;

      return next();
   });
}