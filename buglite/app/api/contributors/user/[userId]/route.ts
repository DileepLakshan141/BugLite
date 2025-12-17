import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UserId not found inside params object" },
        { status: 400 }
      );
    }

    const contributions = await prisma.contributions.findMany({
      where: {
        contributor_id: userId,
        request_accepted: true,
      },
      include: {
        project: true,
      },
    });

    if (contributions) {
      return NextResponse.json(
        {
          success: true,
          message: "Contributions fetched successfully",
          contributions,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No contributions found related to user!",
          contributions: [],
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server side error while" },
      { status: 500 }
    );
  }
}
