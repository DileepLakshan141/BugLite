import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma_client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, author } = body;

    if (!name || !description || !author) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        author,
      },
    });

    return NextResponse.json(
      { success: true, message: "Project created succefully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Project Creation Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Critical error occurred while creating project.",
      },
      { status: 500 }
    );
  }
}
