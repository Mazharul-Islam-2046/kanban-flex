import { createTask, getTasks } from "@/controllers/taskController";
import { NextRequest, NextResponse } from "next/server";



// Get all tasks API route
export async function GET() {
    try {
        const tasks = await getTasks();
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json(
        { error: error instanceof Error ? error.message : "Unknown error" },
        { status: 400 }
        );
    }
}



// Create a new task API route
export async function POST(req: NextRequest) {
  try {
    const task = await createTask(req);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}