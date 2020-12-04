import { Document } from "mongoose";
import { User } from "./User";

export interface UserDocument extends User, Document {
   image_url: string;
   name: string;
   email: string;
   password: string | undefined;
   telephone: string;
   location: any;
}
