import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma_client";

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
