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

    const generateDateSeries = () => {
      const dates = [];
      const today = new Date();

      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
      }

      return dates;
    };

    const rawData = await prisma.$queryRaw<
      {
        date: string;
        open_count: number;
        closed_count: number;
      }[]
    >`
    SELECT 
      DATE("createdAt")::text AS date,
      COUNT(*) FILTER (WHERE "issue_type" = false)::int AS open_count,
      COUNT(*) FILTER (WHERE "issue_type" = true)::int AS closed_count
    FROM "Notification"
    WHERE "target" = ${userId}
    AND "createdAt" >= CURRENT_DATE - INTERVAL '4 days'
    GROUP BY DATE("createdAt")
    ORDER BY date DESC;
    `;

    const dataMap = new Map(rawData.map((item) => [item.date, item]));

    const allDates = generateDateSeries();
    const issuesInsights = allDates.map((date) => {
      if (dataMap.has(date)) {
        return dataMap.get(date)!;
      }
      return {
        date,
        open_count: 0,
        closed_count: 0,
      };
    });
    return NextResponse.json(
      {
        success: true,
        message: "Insights fetched successfully!",
        issuesInsights: issuesInsights.reverse(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server side error while fetching insights!" },
      { status: 500 }
    );
  }
}
