import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { recordId: string } }
) {
  try {
    const { recordId } = await params;
    if (!recordId) {
      return NextResponse.json(
        {
          success: false,
          message: "Record Id is not found inside params object",
        },
        { status: 400 }
      );
    }

    const target_notification = await prisma.notification.findUnique({
      where: {
        id: recordId,
      },
    });

    if (!target_notification) {
      return NextResponse.json(
        {
          success: false,
          message: "No notification found with provided id!",
        },
        { status: 404 }
      );
    }

    const updated_notification = await prisma.notification.update({
      where: {
        id: recordId,
      },
      data: {
        status: true,
      },
    });

    if (updated_notification) {
      return NextResponse.json(
        {
          success: true,
          message: "Notification marked as read!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Error while updating notification status!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while changing notification states",
      },
      { status: 500 }
    );
  }
}
