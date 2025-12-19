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
          message: "User Id is missin inside params object!",
        },
        { status: 400 }
      );
    }

    const notifications = await prisma.notification.findMany({
      where: {
        target: userId,
      },
    });

    if (notifications) {
      return NextResponse.json(
        {
          success: true,
          message: "Notifiations fetched successfully!",
          notifications,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Notifiations fetching operation unsuccessful!",
          notifications,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while fetching notifications!",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, message, userId, issue_type } = await req.json();
    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "title and message is required for a message!",
        },
        { status: 400 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        issue_type,
        target: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Notification dispatched successfully!",
        notification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error while dispatching notification!",
      },
      { status: 500 }
    );
  }
}
