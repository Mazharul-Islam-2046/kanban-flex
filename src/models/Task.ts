import mongoose, { Schema } from "mongoose";


// Task Status Enum
export enum TaskStatus {
    UP_NEXT = "UP_NEXT",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}


// Sub Task Status Enum
export enum subTasksStatus {
    TODO = "TODO",
    DONE = "DONE"
}


// SubTask Interface
export interface ISubTask extends Document {
  title: string;
  description: string;
  status: subTasksStatus;
  assignedTo: mongoose.Types.ObjectId[]
}



// Task Interface
export interface ITask {
    _id?: mongoose.Types.ObjectId
    title: string;
    description: string;
    tags: string[];
    status: TaskStatus;
    assignedTo: mongoose.Types.ObjectId[];
    createdBy: mongoose.Types.ObjectId;
    subTasks: ISubTask[];
    comments?: mongoose.Types.ObjectId[]
    updatedAt?: Date;
    createdAt?: Date;
}



// SubTask Schema
const SubTaskSchema = new Schema<ISubTask>({
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
        enum: Object.values(subTasksStatus),
    },
    assignedTo: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },

})



// Task Schema
const TaskSchema = new Schema<ITask>({

    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    tags: {
        type: [String],
        required: [true, "Tags are required"],
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
        required: [true, "User is required"],
    },
    subTasks: {
        type: [SubTaskSchema],
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment",
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




// Pre Save Hook to save assignedTo as array of user ids
TaskSchema.pre("save", function (next) {

  const uniqueUserIds = new Set<string>();

  this.subTasks.forEach((subtask) => {
    subtask.assignedTo.forEach((userId) => {
      uniqueUserIds.add(userId.toString());
    });
  });

 this.assignedTo = Array.from(uniqueUserIds).map((id) => new mongoose.Types.ObjectId(id));
  next();
});



const Task = mongoose.models.Task as mongoose.Model<ITask> || mongoose.model<ITask>("Task", TaskSchema);

export default Task;