"use client";
import { COLLABORATOR_INVITE } from "@/types/data_types";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const CollaboratorInvite = ({ params }: { params: COLLABORATOR_INVITE }) => {
  const { name, email, image, id, projectId } = params;
  const [sending, setSending] = useState<boolean>(false);

  const sendInvite = async () => {
    try {
      setSending(true);
      if (!id || !projectId) {
        return toast.error("project id or receiver id is missing!");
      }
      const response = await axios.post("/api/contributors/invite", {
        projectId,
        userId: id,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapped = error as AxiosError<{ message: string }>;
      toast.error(wrapped.response?.data?.message);
    } finally {
      setSending(false);
    }
  };

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
      <Button variant="outline" onClick={() => sendInvite()}>
        {sending ? "Sending..." : "Send Invite"}
      </Button>
    </div>
  );
};

export default CollaboratorInvite;
