import dbConnect from "@/db/client";
import Project, { IProject } from "@/models/Project";
import mongoose from "mongoose";

class ProjectService {
  // DB connection check
  private async checkDbConnection(): Promise<void> {
    await dbConnect();
  }

  // Create a new project
  async createProject(projectData: IProject): Promise<IProject> {
    await this.checkDbConnection();
    const project = new Project(projectData);
    return await project.save();
    
  }

  // Get all projects
  async getProjects(): Promise<IProject[]> {
    await this.checkDbConnection();
    return await Project.find()  // In Future I will add---- .populate("members") to populate the members field
  }

  // Get a single project by ID
  async getProjectById(id: string): Promise<IProject | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid project ID");
    }
    return await Project.findById(id) // In Future I will add---- .populate("members") to populate the members field
  }

  // Update a project
  async updateProject(
    id: string,
    updateData: Partial<IProject>
  ): Promise<IProject | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid project ID");
    }
    return await Project.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Delete a project
  async deleteProject(id: string): Promise<IProject | null> {
    await this.checkDbConnection();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid project ID");
    }
    return await Project.findByIdAndDelete(id);
  }

  // Add a member to a project
  async addMemberToProject(
    projectId: string,
    userId: string
  ): Promise<IProject | null> {
    await this.checkDbConnection();
    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      throw new Error("Invalid project or user ID");
    }
    return await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: userId } },
      { new: true }
    );
  }

  // Remove a member from a project
  async removeMemberFromProject(
    projectId: string,
    userId: string
  ): Promise<IProject | null> {
    await this.checkDbConnection();
    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      throw new Error("Invalid project or user ID");
    }
    return await Project.findByIdAndUpdate(
      projectId,
      { $pull: { members: userId } },
      { new: true }
    );
  }
}

export default ProjectService;
