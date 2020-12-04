import { MongooseFilterQuery } from "mongoose";
import { Coordinate } from "../interfaces/Coordinate";
import User from "../models/User";

class SearchRepository {
   async index(user_id: number, location: Coordinate) {
      const { latitude, longitude } = location;

      const users = await User.find({
         location: {
            $near: {
               $geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
               },
               $maxDistance: 10000,
            },
         },
         _id: {
            $ne: user_id,
         },
      });
      return users;
   }
}

export default SearchRepository;
