import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectId, userId } = await req.json();
    if (!projectId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invite must have a project id and user id",
        },
        { status: 404 }
      );
    }

    const record = await prisma.contributions.create({
      data: {
        contributor_id: userId,
        project_id: projectId,
        state: true,
        request_accepted: false,
      },
    });

    return NextResponse.json(
      { success: true, message: "Invite sent successfully!", record },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error occurred while sending invite!",
      },
      { status: 500 }
    );
  }
}
