import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { ISubTask } from "./SubTask";


export enum TaskStatus {
    UP_NEXT = "UP_NEXT",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}


export interface ITask extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo: IUser[];
    createdBy: IUser;
    subTasks: ISubTask[]
}


const TaskSchema: Schema<ITask> = new mongoose.Schema({

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
        enum: Object.values(TaskStatus),
    },
    assignedTo: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    subTasks: {
        type: [Schema.Types.ObjectId],
        ref: "SubTask",
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
}); 


const Task = (mongoose.models.Task as mongoose.Model<ITask>) || mongoose.model<ITask>("Task", TaskSchema);

export default Task;