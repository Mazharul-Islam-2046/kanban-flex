import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";


export interface IUser {
    _id?: mongoose.Types.ObjectId
    userName: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
}


const UserSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, "User Name is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}/,
        select: false
    },
    avatar: {
        type: String,
        // required: [true, "Avatar is required"],
    },
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});



const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);



UserSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default User;