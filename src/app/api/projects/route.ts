import { NextRequest, NextResponse } from "next/server";
import { createProject, getProjects } from "@/controllers/projectController";


export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const project = await createProject(req);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}