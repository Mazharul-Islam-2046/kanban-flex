import { ISubTask, ITask } from "@/models/Task";
import TaskService from "@/services/taskService";
import { NextRequest, NextResponse } from "next/server";

const taskService = new TaskService();

// Create a new task Controller
export async function createTask(req: NextRequest) {
  try {
    const taskData: ITask = await req.json();
    const task = await taskService.createTask(taskData);
    return task;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Get all tasks Controller
export async function getTasks() {
  try {
    const tasks = await taskService.getTasks();
    return tasks;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Get a single task by ID Controller
export async function getTaskById(req: NextRequest, id: string) {
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return task;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Update a task Controller
export async function updateTask(req: NextRequest, id: string) {
  try {
    const updateData: Partial<ITask> = await req.json();
    const updatedTask = await taskService.updateTask(id, updateData);
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return updatedTask;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Delete a task Controller
export async function deleteTask(req: NextRequest, id: string) {
  try {
    const deletedTask = await taskService.deleteTask(id);
    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Add a subtask to a task Controller
export async function addSubtaskToTask(req: NextRequest, taskId: string) {
  try {
    const subtaskData: ISubTask = await req.json();
    const updatedTask = await taskService.addSubtaskToTask(taskId, subtaskData);
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return updatedTask;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Update a subtask in a task Controller
export async function updateSubtaskInTask(
  req: NextRequest,
  taskId: string,
  subtaskId: string
) {
  try {
    const updatedSubtask: Partial<ISubTask> = await req.json();
    const updatedTask = await taskService.updateSubtaskInTask(
      taskId,
      subtaskId,
      updatedSubtask
    );
    if (!updatedTask) {
      return NextResponse.json(
        { error: "Task or subtask not found" },
        { status: 404 }
      );
    }
    return updatedTask;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Delete a subtask from a task Controller
export async function deleteSubtaskFromTask(
  req: NextRequest,
  taskId: string,
  subtaskId: string
) {
  try {
    const updatedTask = await taskService.deleteSubtaskFromTask(
      taskId,
      subtaskId
    );
    if (!updatedTask) {
      return NextResponse.json(
        { error: "Task or subtask not found" },
        { status: 404 }
      );
    }
    return updatedTask;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
