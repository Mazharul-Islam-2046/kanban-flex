import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "./Task";



export enum SubTaskStatus {
    UP_NEXT = "UP_NEXT",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export interface ISubTask extends Document {
  title: string;
  description: string;
  status: SubTaskStatus;
  parentTask: ITask
}



const SubTaskSchema: Schema<ISubTask> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
    },
    parentTask: {
        type: Schema.Types.ObjectId,
        ref: "Task",
    }
})



const SubTask = mongoose.models.SubTask || mongoose.model<ISubTask>("SubTask", SubTaskSchema);
export default SubTask
