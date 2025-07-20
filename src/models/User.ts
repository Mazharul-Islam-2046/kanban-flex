import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface IUserInput {
  _id?: mongoose.Types.ObjectId;
  userName: string;
  name: string;
  email: string;
  password?: string; // Make optional for OAuth users
  role: "user" | "admin";
  avatar?: string;
  theme: Theme;
}

export interface IUser extends IUserInput, Document {
  emailVerified?: Date; // Add for Auth.js compatibility
  accounts?: mongoose.Types.ObjectId[]; // For linked accounts

  isPasswordMatched(password: string): Promise<boolean>;
  generateAccessToken(): string | null;
  generateRefreshToken(): string | null;
}

const UserSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, "User Name is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: function () {
        // Only require password for non-OAuth users
        return !this.accounts || this.accounts.length === 0;
      },
      match:
        /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}/,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    theme: {
      type: String,
      enum: Object.values(Theme),
      default: Theme.LIGHT,
    },
    emailVerified: {
      type: Date,
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password; // Always remove password from JSON output
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// add indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ userName: 1 }, { unique: true });

// Password Bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// isPasswordMatched
UserSchema.methods.isPasswordMatched = async function (
  password: string
): Promise<boolean> {
  return this.password ? await bcrypt.compare(password, this.password) : false;
};

// generate access token
UserSchema.methods.generateAccessToken = function (): string | null {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    return null;
  }

  if (!process.env.ACCESS_TOKEN_EXPIRY) {
    return null;
  }

  const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10);

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
UserSchema.methods.generateRefreshToken = function (): string | null {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    return null;
  }

  if (!process.env.REFRESH_TOKEN_EXPIRY) {
    return null;
  }

  const expiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10);

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn,
    }
  );
};

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
export default User;
