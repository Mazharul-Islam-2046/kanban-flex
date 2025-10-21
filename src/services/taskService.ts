import dbConnect from "@/lib/client";
import Task, { ISubTask, ITask } from "@/models/Task";
import mongoose from "mongoose";

class TaskService {
  // DB connection check
  private async checkDbConnection(): Promise<void> {
    await dbConnect();
  }

  //   Create a new task
  async createTask(taskData: ITask): Promise<ITask> {
    await this.checkDbConnection();
    const task = new Task(taskData);
    return await task.save();
  }

  //   Get all tasks
  async getTasks(): Promise<ITask[]> {
    await this.checkDbConnection();
    return await Task.find();
  }

  //   Get a single task by ID
  async getTaskById(id: string): Promise<ITask | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid task ID");
    }
    return await Task.findById(id);
  }

  //   Update a task
  async updateTask(
    id: string,
    updateData: Partial<ITask>
  ): Promise<ITask | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid task ID");
    }
    return await Task.findByIdAndUpdate(id, updateData, { new: true });
  }

  //   Delete a task
  async deleteTask(id: string): Promise<ITask | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid task ID");
    }
    return await Task.findByIdAndDelete(id);
  }

  //   Add a subtask to a task
  async addSubtaskToTask(
    taskId: string,
    subtaskData: ISubTask
  ): Promise<ITask | null> {
    await this.checkDbConnection();

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task ID");
    }

    return await Task.findByIdAndUpdate(
      taskId,
      { $addToSet: { subTasks: subtaskData } },
      { new: true }
    );
  }

  //   Update a Subtask from a task
  async updateSubtaskInTask(
    taskId: string,
    subtaskId: string,
    updatedSubtask: Partial<ISubTask>
  ): Promise<ITask | null> {
    await this.checkDbConnection();

    if (
      !mongoose.Types.ObjectId.isValid(taskId) ||
      !mongoose.Types.ObjectId.isValid(subtaskId)
    ) {
      throw new Error("Invalid task or subtask ID");
    }

    // Build dynamic $set object
    type SubTaskUpdateFields =
      | "subTasks.$.title"
      | "subTasks.$.description"
      | "subTasks.$.status"
      | "subTasks.$.assignedTo";

    const setFields: Partial<
      Record<SubTaskUpdateFields, ISubTask[keyof ISubTask]>
    > = {};
    if (updatedSubtask.title !== undefined) {
      setFields["subTasks.$.title"] = updatedSubtask.title;
    }
    if (updatedSubtask.description !== undefined) {
      setFields["subTasks.$.description"] = updatedSubtask.description;
    }
    if (updatedSubtask.status !== undefined) {
      setFields["subTasks.$.status"] = updatedSubtask.status;
    }
    if (updatedSubtask.assignedTo !== undefined) {
      setFields["subTasks.$.assignedTo"] = updatedSubtask.assignedTo;
    }

    return await Task.findOneAndUpdate(
      { _id: taskId, "subTasks._id": subtaskId },
      { $set: setFields },
      { new: true }
    );
  }

  //   Delete a Subtask from a task
  async deleteSubtaskFromTask(
    taskId: string,
    subtaskId: string
  ): Promise<ITask | null> {
    await this.checkDbConnection();

    if (
      !mongoose.Types.ObjectId.isValid(taskId) ||
      !mongoose.Types.ObjectId.isValid(subtaskId)
    ) {
      throw new Error("Invalid task or subtask ID");
    }

    return await Task.findByIdAndUpdate(
      taskId,
      {
        $pull: {
          subTasks: { _id: subtaskId },
        },
      },
      { new: true }
    );
  }
}

export default TaskService;
