import { prisma } from "@/prisma/prisma_client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Project Id is missing in params object!" },
        { status: 400 }
      );
    }

    const { user_id, title, description, category, state } = await req.json();
    if (!user_id || !title || !description || !category || !state) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Relevant fields are missing that required for logbook record!",
        },
        { status: 400 }
      );
    }

    const new_record = await prisma.logbook.create({
      data: {
        project_id: projectId,
        user_id,
        title,
        description,
        category,
        state,
      },
      include: {
        project: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Logbook record created successfully",
        new_record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error occurred while creating log record!" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    if (!projectId) {
      return NextResponse.json(
        { success: false, message: "Project Id is missing in params object!" },
        { status: 400 }
      );
    }

    const logbook_records = await prisma.logbook.findMany({
      where: {
        project_id: projectId,
      },
      include: {
        user: true,
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (logbook_records) {
      return NextResponse.json(
        {
          success: true,
          message: "Logbook records fetched",
          logbook_records,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Logbook records not fetched",
          logbook_records: [],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error occurred while creating log record!" },
      { status: 500 }
    );
  }
}
