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
        {
          success: false,
          message: "User Id not found inside params object",
        },
        { status: 404 }
      );
    }

    const unread_notifications = await prisma.notification.findMany({
      where: {
        target: userId,
        status: false,
      },
    });

    if (!unread_notifications) {
      return NextResponse.json(
        {
          success: false,
          message: "No unread notifications for you!",
          unread_notifications: [],
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Unread notifications successfully fetched!",
        unread_notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while fetching unread notifications",
      },
      { status: 500 }
    );
  }
}
