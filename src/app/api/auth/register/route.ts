import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/db/client"



export const POST = async (req: NextRequest) => {
    await connectDB();
    const { userName, email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, name, email, password: hashedPassword });
    return NextResponse.json({ user });
};