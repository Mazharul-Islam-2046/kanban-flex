import { addSubtaskToTask } from "@/controllers/taskController";
import { NextRequest, NextResponse } from "next/server";


// Create a new Subtask API route
export async function PATCH (req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const task = await addSubtaskToTask(req, id);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}