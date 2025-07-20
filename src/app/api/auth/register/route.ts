import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/controllers/userController";

export const POST = async (req: NextRequest) => {
  try {
    const newUser = registerUser(req);
    return NextResponse.json(
      {
        success: true,
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
};
