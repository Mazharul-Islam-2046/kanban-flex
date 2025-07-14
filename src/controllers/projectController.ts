import { NextRequest, NextResponse } from "next/server";
import ProjectService from "@/services/projectService";
import { IProject } from "@/models/Project";



const projectService = new ProjectService();


export async function createProject(req: NextRequest) {
  try {
    const projectData: IProject = await req.json();
    const project = await projectService.createProject(projectData);
    return project
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function getProjects() {
  try {
    const projects = await projectService.getProjects();
    return projects;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function getProjectById(req: NextRequest, id: string) {
  try {
    const project = await projectService.getProjectById(id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return project
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function updateProject(req: NextRequest, id: string) {
  try {
    const updateData: Partial<IProject> = await req.json();
    const updatedProject = await projectService.updateProject(id, updateData);
    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function deleteProject(req: NextRequest, id: string) {
  try {
    const deletedProject = await projectService.deleteProject(id);
    if (!deletedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function addProjectMember(req: NextRequest, id: string) {
  try {
    const { userId } = await req.json();
    const updatedProject = await projectService.addMemberToProject(id, userId);
    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function removeProjectMember(req: NextRequest, id: string) {
  try {
    const { userId } = await req.json();
    const updatedProject = await projectService.removeMemberFromProject(id, userId);
    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}