import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;
  try {
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "UserId is missing in params object" },
        {
          status: 400,
        }
      );
    }

    const invitations = await prisma.contributions.findMany({
      where: {
        contributor_id: userId,
      },
    });

    if (!invitations) {
      return NextResponse.json(
        {
          success: true,
          message: "Invitations fetched successfully!",
          invitations,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invitations related to you are not found!",
          invitations: [],
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while fetching invitations!",
      },
      {
        status: 500,
      }
    );
  }
}
