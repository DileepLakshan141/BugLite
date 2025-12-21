"use client";
import { NOTIFICATION } from "@/types/data_types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { BadgeAlert, LaptopMinimalCheck, MailCheck } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

const NotificationCard = ({ params }: { params: NOTIFICATION }) => {
  const { id, createdAt, title, message, status, issue_type } = params;
  const [loading, setLoading] = useState<boolean>(false);
  const [readStatus, setReadStatus] = useState<boolean>(status);
  const [closedIssue, setClosedIssue] = useState<boolean>(issue_type);

  const markAsRead = async (notificationId: string) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/notifications/read/${notificationId}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setReadStatus(true);
        setClosedIssue(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
      console.log(wrapper);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border border-black rounded-lg my-2 p-2">
      <div className="flex items-center mb-2">
        {closedIssue ? (
          <LaptopMinimalCheck className="text-green-500 mr-3" />
        ) : (
          <BadgeAlert className="text-amber-500 mr-3" />
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <p>{message}</p>
      <Separator className="my-2" />
      <div className="w-full flex justify-between items-center">
        <span className="text-sm text-muted-foreground italic">
          Received On: {dayjs(createdAt).format("HH:mm DD/MM/YYYY")}
        </span>
        {!readStatus ? (
          <Button
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => markAsRead(id)}
          >
            <MailCheck />
            {loading ? "Marking..." : " Mark as Read"}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
