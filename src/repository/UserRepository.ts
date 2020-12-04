import { UserDocument as IUserDocument } from "../interfaces/UserDocument";
import { User as IUser } from "../interfaces/User";

import User from "../models/User";

class UserRepository {
   async index() {
      const users = await User.find();
      return users;
   }

   async show(id: string) {
      const user = await User.findById(id);
      return user;
   }

   async showByEmail(email: string) {
      const user = await User.findOne({ email });
      return user;
   }

   async update(id: string, data: IUser) {
      const updatedUser = await User.updateOne({ _id: id }, data);
      return updatedUser;
   }

   async updateLocation(id: string, location: any) {
      const updatedUser: IUser = await User.updateOne(
         { _id: id },
         { location }
      );
      return updatedUser;
   }

   async destroy(id: string) {
      const user = await User.findById(id);
      await User.remove({ _id: id });
      return user;
   }
}

export default UserRepository;
