import { deleteSubtaskFromTask, updateSubtaskInTask } from "@/controllers/taskController";
import { NextRequest, NextResponse } from "next/server";



// Update a sub task API route
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string, subtaskId: string }> }) {
  const { id, subtaskId } = await params;
  try {
    const result = await updateSubtaskInTask(req, id, subtaskId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}



// Delete a sub task API route
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string, subtaskId: string }> }) {
  const { id, subtaskId } = await params;
  try {
    const deletedTask = await deleteSubtaskFromTask(req, id, subtaskId);
    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(deletedTask, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}