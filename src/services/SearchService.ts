import { Request, Response } from "express";
import { Coordinate } from "../interfaces/Coordinate";

import SearchRepository from "../repository/SearchRepository";

const searchRepository = new SearchRepository();

class SearchService {
   async index(request: Request, response: Response) {
      const { latitude, longitude } = request.query;
      const { user_id } = request.body;

      const location: Coordinate = {
         latitude: Number(latitude),
         longitude: Number(longitude),
      };

      const nearbyUsers = await searchRepository.index(user_id, location);

      return response.json(nearbyUsers);
   }
}

export default SearchService;
