import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchEmail } = await req.json();
    if (!searchEmail) {
      return NextResponse.json(
        { success: false, message: "Search email address is missing!" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: searchEmail },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found with the provided email",
          response: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User found successfully!",
        response: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server side error occurred while searching!",
      },
      { status: 500 }
    );
  }
}
