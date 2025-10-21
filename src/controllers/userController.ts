import { IUserInput, Theme } from "@/models/User";
import UserService from "@/services/userService";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const userService = new UserService();

export async function registerUser(req: NextRequest) {
  try {
    const { userName, name, email, password } = await req.json();

    // Validate input
    if (!userName || !name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: IUserInput = {
      userName,
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
      theme: Theme.LIGHT, // Default theme
    }

    const user = await userService.createUser(userData);
    return user;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
