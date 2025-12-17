"use client";
import { INVITATION } from "@/types/data_types";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCheck, CircleDot, Hand } from "lucide-react";
import dayjs from "dayjs";
import useUserStore from "@/utils/zustand/store";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const InvitationCard = ({ params }: { params: INVITATION }) => {
  const { id, project, createdAt, request_accepted } = params;
  const { getUser } = useUserStore();
  const userId = getUser()?.id;

  const acceptInvitation = async () => {
    try {
      const response = await axios.put(`/api/invitations/accept/${id}`, {
        userId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(wrapper.response?.data.message);
      console.log(wrapper);
    }
  };
  return (
    <div className="w-full border border-black rounded-lg p-2 my-2">
      <div className="flex justify-between items-center">
        <h1 className="capitalize text-lg font-semibold">
          New Collaboration Invite
        </h1>
        {request_accepted ? (
          <Badge variant="secondary">
            {" "}
            <CheckCheck className="text-green-500" /> Accepted
          </Badge>
        ) : (
          <Badge variant="secondary">
            {" "}
            <CircleDot className="text-red-500" /> Pending
          </Badge>
        )}
      </div>
      <Separator className="my-1" />
      <p>
        You have new contribution request from{" "}
        <span className="font-semibold">{project.user.name} </span> for the
        project called <span className="font-semibold">{project.name}</span>.
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-muted-foreground italic mt-2">
          Received on{" "}
          <Badge variant="secondary">
            {dayjs(createdAt).format("HH:mm DD MMM,YYYY")}
          </Badge>
        </p>
        <Button
          size="sm"
          disabled={request_accepted}
          onClick={() => acceptInvitation()}
        >
          <Hand /> {request_accepted ? "Accepted" : "Accept"}
        </Button>
      </div>
    </div>
  );
};

export default InvitationCard;
