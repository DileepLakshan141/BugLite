"use client";
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
import useUserStore from "@/utils/zustand/store";
import axios, { AxiosError } from "axios";
import {
  BellDot,
  ChartSpline,
  FolderGit,
  FolderGit2,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";
import { NOTIFICATION } from "@/types/data_types";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationCard from "@/components/notification/NotificationCard";

const HomeScreenDashboard = () => {
  const [notificationLoading, setNotificationLoading] =
    useState<boolean>(false);
  const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([]);
  const { getUser } = useUserStore();

  const user = getUser();
  const userId = user?.id;

  const fetchInsights = async () => {
    try {
      setInsightsLoading(true);
      const response = await axios.get(`/api/insights/${userId}`);
      if (response.data.success) {
        console.log(response.data);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
    } finally {
      setInsightsLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    try {
      setNotificationLoading(true);
      const response = await axios.get(`/api/notifications/unread/${userId}`);
      if (response.data.success) {
        setNotifications(response.data.unread_notifications);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
    } finally {
      setNotificationLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
    fetchUnreadNotifications();
  }, [userId]);
  return (
    <div className="w-full flex flex-col justify-start items-start">
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
          <div className="w-full h-[350px] p-2 flex flex-col justify-center items-center">
            <h1 className="w-full text-2xl font-semibold text-left">
              Opened & Closed Issues
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
          <div className="w-full h-[350px] p-2 flex flex-col justify-center items-center">
            <h1 className="w-full text-2xl font-semibold text-left">
              Notifications
            </h1>
            <Separator className="my-3" />
            {notificationLoading ? (
              <Loader
                params={{
                  full_h: true,
                  support_text: "Looking for new notifications! Please wait!",
                }}
              />
            ) : notifications.length < 1 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BellDot />
                  </EmptyMedia>
                  <EmptyTitle>No new notifications!</EmptyTitle>
                  <EmptyDescription>
                    Currently you dont have any new notifications. Check
                    regularly for see any updates. We will notify you if any new
                    messages is there.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <ScrollArea className="w-full max-w-[650px] h-70 px-5 py justify-self-start">
                {notifications.map((notification: NOTIFICATION) => {
                  return (
                    <NotificationCard
                      params={notification}
                      key={notification.id}
                    />
                  );
                })}
              </ScrollArea>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreenDashboard;
