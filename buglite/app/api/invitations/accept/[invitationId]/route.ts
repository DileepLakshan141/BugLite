import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { invitationId: string } }
) {
  const { invitationId } = await params;
  try {
    const { userId } = await req.json();

    if (!invitationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invitation ID not found in params object!",
        },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID must be present inside request body!",
        },
        { status: 400 }
      );
    }

    const target_invite = await prisma.contributions.findUnique({
      where: {
        id: invitationId,
      },
    });

    if (!target_invite) {
      return NextResponse.json(
        { success: false, message: "No invitation found with provided id!" },
        { status: 400 }
      );
    }

    if (target_invite.contributor_id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to interact with this invite!",
        },
        { status: 403 }
      );
    }

    const updated_invite = await prisma.contributions.update({
      where: {
        id: invitationId,
      },
      data: {
        request_accepted: true,
      },
    });

    if (updated_invite) {
      return NextResponse.json(
        {
          success: true,
          message: "Invite request accepted! update completed!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Error while updating collaboration invite!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while updating request status!",
      },
      { status: 500 }
    );
  }
}
