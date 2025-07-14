import mongoose, { Schema } from "mongoose";

export interface IProject {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  coverImage?: string;
  members: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  tasks?: mongoose.Types.ObjectId[];
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  coverImage: {
    type: String,
    // required: [true, "Cover Image is required"],
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: "Task",
  },
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});



const Project = mongoose.models.Project as mongoose.Model<IProject> || mongoose.model<IProject>("Project", ProjectSchema);
export default Project
