import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  post: IPost['_id']
};

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
  user: IUser['_id']
};


const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    require: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    require: true,
  },

  createdAt: {
    type: Date,
    require: true
},
});

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },

  content: {
    type: String,
    require: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },

  comments: {
    type: [CommentSchema],
    require: false,
  }
});

export default mongoose.model<IPost>("Post", PostSchema);
