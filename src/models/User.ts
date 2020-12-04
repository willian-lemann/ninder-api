import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import PointSchema from "./PointSchema";

import { UserDocument } from "../interfaces/UserDocument";

const user = {
   image_url: String,
   name: String,
   email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
   },
   password: {
      type: String,
      select: false,
      required: true,
   },
   telephone: String,
   birthday: String,
   nationality: String,
   location: {
      type: PointSchema,
      index: "2dsphere",
   },
   createAt: {
      type: Date,
      default: Date.now,
   },
};
const UserSchema = new Schema(user);

export default model<UserDocument>("User", UserSchema);
