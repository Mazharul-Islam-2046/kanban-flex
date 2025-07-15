import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/db/client";



export const POST = async (req: NextRequest) => {
    await dbConnect();
    const { userName, email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword, name });
    return NextResponse.json({ user });
};