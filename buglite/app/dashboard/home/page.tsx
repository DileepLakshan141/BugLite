"use client";
import HeaderComponent from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  BellDot,
  ChartSpline,
  FolderGit,
  FolderGit2,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";

const HomeScreenDashboard = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <HeaderComponent />
      <div className="w-full flex flex-col justify-start items-start mt-[90px] p-4">
        <h1 className="text-2xl font-semibold">Recently Interacted Projects</h1>
        <Separator className="my-3" />
        {/* recent projects container */}
        <div className="w-full flex justify-center items-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderGit2 />
              </EmptyMedia>
              <EmptyTitle>
                No recently created/contributed projects found!
              </EmptyTitle>
              <EmptyDescription>
                Looks like currently you have no created projects or contributed
                projects. This section will display the infomation related to
                your projects once they are created.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex flex-row wrap-normal items-center justify-center gap-2">
              <Link href="/dashboard/projects">
                <Button>
                  <FolderKanban /> Create Project
                </Button>
              </Link>
              <Button>
                {" "}
                <FolderGit /> Contribution Requests
              </Button>
            </EmptyContent>
          </Empty>
        </div>
        {/* second row charts and notifications */}
        <section className="w-full flex gap-1 flex-col justify-start items-start md:flex-row">
          {/* chart container */}
          <div className="w-full p-2 flex flex-col justify-center items-center">
            <h1 className="w-full text-2xl font-semibold text-left">
              Solved & Resolved Bugs
            </h1>
            <Separator className="my-3" />
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ChartSpline />
                </EmptyMedia>
                <EmptyTitle>Insight charts not available</EmptyTitle>
                <EmptyDescription>
                  Currently we dont available enough data to generate the
                  insight charts. Chart will be available once sufficient data
                  available.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
          {/* notification window */}
          <div className="w-full  p-2 flex flex-col justify-center items-center">
            <h1 className="w-full text-2xl font-semibold text-left">
              Notifications
            </h1>
            <Separator className="my-3" />
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BellDot />
                </EmptyMedia>
                <EmptyTitle>No notifications!</EmptyTitle>
                <EmptyDescription>
                  Currently you dont have any notifications. Check regularly for
                  see any updates. We will notify you if any requests or tasks
                  mentioned about you.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreenDashboard;
