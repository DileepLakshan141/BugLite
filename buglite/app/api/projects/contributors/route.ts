import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { project_id, user_id } = await req.json();
    if (!project_id || !user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Project Id and Contributor Id both required!",
        },
        { status: 400 }
      );
    }

    const contribution_result = await prisma.contributions.create({
      data: {
        project_id,
        contributor_id: user_id,
        state: false,
        request_accepted: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contributor added succefully!",
        contribution_result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contributor Creation Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while adding contributors!",
      },
      { status: 500 }
    );
  }
}
