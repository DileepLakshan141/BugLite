"use client";
import { COLLABORATOR_INVITE } from "@/types/data_types";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const CollaboratorInvite = ({ params }: { params: COLLABORATOR_INVITE }) => {
  const { name, email, image } = params;
  return (
    <div className="w-full border rounded-lg h-[90px] flex justify-between items-center p-2">
      {/* avatar container */}
      <div className="w-auto flex justify-center items-center gap-5">
        <Avatar className="size-11">
          <AvatarImage src={image} />
          <AvatarFallback className="text-lg font-semibold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-start items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-md text-muted-foreground">{email}</p>
        </div>
      </div>
      <Button variant="outline">Send Invite</Button>
    </div>
  );
};

export default CollaboratorInvite;
