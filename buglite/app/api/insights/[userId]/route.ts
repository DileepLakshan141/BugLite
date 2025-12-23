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
        { success: false, message: "User Id not found inside request body" },
        { status: 404 }
      );
    }

    const issuesInsights = await prisma.$queryRaw<
      {
        date: string;
        open_count: number;
        closed_count: number;
      }[]
    >`
    SELECT 
    DATE("createdAt") AS date,
    COUNT(*) FILTER (WHERE "issue_type" = false) AS open_count,
    COUNT(*) FILTER (WHERE "issue_type" = true) AS closed_count
    FROM "Nssotification"
    WHERE "receiver" = ${userId}
    AND "createdAt" >= CURRENT_DATE - INTERVAL '4 days'
    GROUP BY DATE("createdAt")
    ORDER BY date DESC;
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Insights fetched successfully!",
        issuesInsights,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { success: false, message: "Server side error while fetching insights!" },
      { status: 500 }
    );
  }
}
