import { NextRequest, NextResponse } from "next/server";
import { deleteProject, getProjectById, updateProject } from "@/controllers/projectController";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>} 
) {
  try {
    const { id } = await params;
    const project = await getProjectById(req, id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  try {
    const {id} = await params;
    const updatedProject = await updateProject(
        req,
        id,
    );
    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }>}
) {
  try {
    const {id} = await params;
    const deletedProject = await deleteProject(req, id);
    if (!deletedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedProject);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}