import mongoose, { Schema } from "mongoose";

export interface IProject {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  coverImage?: string;
  tasks: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
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
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: "Task",
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
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



const Project = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project
