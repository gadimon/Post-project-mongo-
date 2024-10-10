import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import { IPost } from './postModel';
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string,
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<Boolean>
};

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
    validate: [validator.isEmail, 'Email is not valid'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},

profile: {
  bio:{
    type: String,
    default: '',
  },
  socialLinks:{
    type: [String],
    required: false,
    validate: [validator.isURL, 'Invalid URL in social links'],
  }
},

posts: {
  type: [Schema.Types.ObjectId],
  ref: 'posts'
}
}, { timestamps: true });


//פונקצייה שמצפינה את הסיסמא
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//מתודה להשוואת סיסמאות
UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return bcrypt.compare(userPassword, this.password)
}

export default mongoose.model<IUser>("User", UserSchema);
