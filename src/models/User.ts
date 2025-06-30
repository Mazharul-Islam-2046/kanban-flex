import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}



export interface IUser {
    _id?: mongoose.Types.ObjectId
    userName: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    theme: Theme;
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
    theme: {
        type: String,
        enum: Object.values(Theme),
        default: Theme.LIGHT
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



// add indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ userName: 1 }, { unique: true });


// Password Bcrypt
UserSchema.pre("save", async function(next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});



// isPasswordMatched
UserSchema.methods.isPasswordMatched = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}



const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);



UserSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// generate access token
UserSchema.methods.generateAccessToken = function () {

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return null;
  }

  if (!process.env.ACCESS_TOKEN_EXPIRY) {
    return null;
  }

  const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10)


  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn,
    }
  );
};




// generate refresh token
UserSchema.methods.generateRefreshToken = function () {

  if (!process.env.REFRESH_TOKEN_SECRET) {
    return null;
  }

  if (!process.env.REFRESH_TOKEN_EXPIRY) {
    return null;
  }

  const expiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10)


  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn
    }
  );
};

export default User;