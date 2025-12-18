"use client";

import { LOGBOOK_RECORD } from "@/types/data_types";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  BookCheck,
  BrushCleaning,
  Bug,
  CheckCheck,
  DiamondPlus,
  FolderCode,
  Gauge,
  LayoutGrid,
  MessageCircleWarning,
  ShieldAlert,
  TestTubeDiagonal,
  TriangleAlert,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import useUserStore from "@/utils/zustand/store";

const LogRecord = ({ params }: { params: LOGBOOK_RECORD }) => {
  const { user, title, description, category, state, createdAt } = params;
  const { getUser } = useUserStore();

  const dispachMessage = async () => {};

  const constructMessage = (
    projectName: string,
    issueName: string,
    userName: string
  ) => {
    const title = `Issue closed on ${projectName}`;
    const message = `The issue named "${issueName}" has been closed by ${userName}. You can check the log records for updated record state.`;
    return { title, message };
  };

  return (
    <div className="w-full border-black border rounded-lg p-2 my-2">
      {/* user details and category info */}
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Avatar className="size-5">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground italic">by {user.name}</span>
        </div>

        <Badge
          className={`
            ${
              category === "issue"
                ? "bg-blue-600"
                : category === "bug"
                ? "bg-amber-600"
                : category === "security"
                ? "bg-red-600"
                : category === "testing"
                ? "bg-violet-600"
                : category === "feature-request"
                ? "bg-pink-700"
                : category === "refactor"
                ? "bg-purple-600"
                : category === "performance"
                ? "bg-orange-600"
                : category === "architecture"
                ? "bg-amber-700"
                : "bg-green-600"
            } uppercase w-25 h-6`}
        >
          {category === "issue" ? (
            <TriangleAlert />
          ) : category === "bug" ? (
            <Bug />
          ) : category === "security" ? (
            <ShieldAlert />
          ) : category === "testing" ? (
            <TestTubeDiagonal />
          ) : category === "feature-request" ? (
            <LayoutGrid />
          ) : category === "refactor" ? (
            <BrushCleaning />
          ) : category === "performance" ? (
            <Gauge />
          ) : category === "architecture" ? (
            <FolderCode />
          ) : (
            <MessageCircleWarning />
          )}{" "}
          {category}
        </Badge>
      </div>
      <Separator className="my-2" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{description}</p>
      <Separator className="my-2" />
      <div className="flex justify-between items-center">
        <span className="text-sm italic">
          Created on {dayjs(createdAt).format("HH:mm DD MMM, YYYY")}
        </span>
        <div className="flex itmes-center">
          <Badge variant="secondary">
            {state === "pending" ? (
              <DiamondPlus className="text-red-500" />
            ) : (
              <CheckCheck className="text-green-500" />
            )}{" "}
            {state.toUpperCase()}
          </Badge>
        </div>
        {state === "pending" ? (
          <Button variant="link" size="sm">
            <BookCheck /> Close Issue
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default LogRecord;
