import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/db/client"
import bcrypt from "bcryptjs";



export const POST = async (req: NextRequest) => {
    await connectDB();
    const { userName, email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword, name });
    return NextResponse.json({ user });
};