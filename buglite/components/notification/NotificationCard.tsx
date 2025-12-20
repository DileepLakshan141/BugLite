"use client";
import { NOTIFICATION } from "@/types/data_types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { BadgeAlert, LaptopMinimalCheck, MailCheck } from "lucide-react";
import { Badge } from "../ui/badge";

const NotificationCard = ({ params }: { params: NOTIFICATION }) => {
  const { id, createdAt, title, message, status, issue_type } = params;
  return (
    <div className="w-full border border-black rounded-lg my-2 p-2">
      <div className="flex items-center mb-2">
        {issue_type ? (
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
        {!status ? (
          <Button size="sm" variant="outline">
            <MailCheck /> Mark as Read
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
