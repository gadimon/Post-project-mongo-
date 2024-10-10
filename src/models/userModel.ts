import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  password: string,
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: {
      type: String,
      require: true,
      unique: true,
  },

  password: {
    type: String,
    require: true,
    minLength: 6,
},

  email: { 
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},

}, { timestamps: true });



export default mongoose.model<IUser>("User", UserSchema);
