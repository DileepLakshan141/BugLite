"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import axios, { AxiosError } from "axios";
import useUserStore from "@/utils/zustand/store";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { NOTIFICATION } from "@/types/data_types";
import Loader from "@/components/loader/Loader";
import Placeholder from "@/components/Placeholder/Placeholder";
import { MailSearch } from "lucide-react";
import NotificationCard from "@/components/notification/NotificationCard";

const MyNotifications = () => {
  const { getUser } = useUserStore();
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = getUser();

  const getAllNotificationsForUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/notifications/${user?.id}`);
      if (response.data.success) {
        setNotifications(response.data.notifications);
        console.log(response.data.notifications);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(
        wrapper.response?.data.message ||
          "critical error occurred while fetching notifications!"
      );
      console.log(wrapper);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotificationsForUser();
  }, [user?.id]);

  return (
    <div className="w-full flex flex-col justify-center items-center pt-[90px]">
      <h1 className="text-2xl font-semibold text-left w-full pl-10">
        My Notifications
      </h1>
      <Separator className="my-3" />
      <div className="w-full flex flex-col justify-start items-center max-w-[1000px] p-4 ">
        <section className="w-full max-w-[600px] h-[700px] mx-4 flex flex-col justify-center items-center p-2 border rounded-lg">
          {loading ? (
            <Loader
              params={{
                support_text: "Checking for notifications! Please Wait!",
                full_h: true,
              }}
            />
          ) : notifications.length < 1 ? (
            <Placeholder
              params={{
                Icon: MailSearch,
                title: "No Messages Found!",
                description:
                  "Looks like curerntly you dont have any notifications. Check later for any updates.",
              }}
            />
          ) : (
            <ScrollArea className="w-full h-full max-h-[700px] pr-5">
              {notifications.map((note) => {
                return <NotificationCard params={note} key={note.id} />;
              })}
            </ScrollArea>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyNotifications;
