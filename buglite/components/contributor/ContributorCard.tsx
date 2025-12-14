"use client";
import { COLLABORATOR } from "@/types/data_types";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { BadgeCheck } from "lucide-react";

const ContributorCard = ({ params }: { params: COLLABORATOR }) => {
  const { user, request_accepted } = params;

  return (
    <div className="w-full border rounded-lg h-[90px] flex justify-between items-center p-2">
      {/* avatar container */}
      <div className="w-auto flex justify-center items-center gap-5">
        <Avatar className="size-11">
          <AvatarImage src={user.image} />
          <AvatarFallback className="text-lg font-semibold">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-start items-start">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-md text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Badge>
        <BadgeCheck /> {request_accepted ? "Accepted" : "Pending"}
      </Badge>
    </div>
  );
};

export default ContributorCard;
