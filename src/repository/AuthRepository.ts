import { User as IUser } from "../interfaces/User";
import User from "../models/User";

class AuthRepository {
   async findByEmail(email: string) {
      const user = await User.findOne({ email }).select("+password");
      return user;
   }

   async Register(newUser: any) {
      const createdUser = await User.create(newUser);
      return createdUser;
   }
}

export default AuthRepository;
