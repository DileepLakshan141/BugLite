import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma_client";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const projects = await prisma.project.findMany({
      where: {
        author: userId,
      },
    });
    if (!projects) {
      return NextResponse.json(
        { success: false, message: "No projects found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error) {
    console.log("error occurred while receiving user specific projects", error);
    return NextResponse.json(
      { success: false, message: "Server side error occurred!" },
      { status: 500 }
    );
  }
}
