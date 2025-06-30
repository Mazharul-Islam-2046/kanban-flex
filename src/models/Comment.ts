import mongoose from "mongoose";


export interface IComment {
    _id?: mongoose.Types.ObjectId
    content: string
    user: mongoose.Types.ObjectId
    task: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}


const CommentSchema = new mongoose.Schema<IComment>({
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: [true, "Task is required"],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

const Comment = mongoose.models.Comment as mongoose.Model<IComment> || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment