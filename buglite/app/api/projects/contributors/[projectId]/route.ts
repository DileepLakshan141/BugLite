import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Project id not found in params object" },
        { status: 400 }
      );
    }

    const contributors = await prisma.contributions.findMany({
      where: {
        project_id: projectId,
      },
      include: {
        user: true,
        project: true,
      },
    });

    if (contributors.length > 0) {
      return NextResponse.json(
        { success: true, message: "Contributors fetched", contributors },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Contributors not found",
          contributors: [],
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error occurred while retrieving contributors",
      },
      { status: 500 }
    );
  }
}
