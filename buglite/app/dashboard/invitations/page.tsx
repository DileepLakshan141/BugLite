"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import axios, { AxiosError } from "axios";
import useUserStore from "@/utils/zustand/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { INVITATION } from "@/types/data_types";
import Loader from "@/components/loader/Loader";
import Placeholder from "@/components/Placeholder/Placeholder";
import { MailSearch } from "lucide-react";
import InvitationCard from "@/components/invitation_card/InvitationCard";

const MyInvitations = () => {
  const { getUser } = useUserStore();
  const [invitations, setInvitations] = useState<INVITATION[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const user = getUser();

  const getAllInvitiationsForUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/invitations/${user?.id}`);
      if (response.data.success) {
        setInvitations(response.data.invitations);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const wrapper = error as AxiosError<{ message: string }>;
      toast.error(
        wrapper.response?.data.message ||
          "critical error occurred while fetching invitations!"
      );
      console.log(wrapper);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInvitiationsForUser();
  }, [user?.id]);

  return (
    <div className="w-full flex flex-col justify-center items-center pt-[90px]">
      <h1 className="text-2xl font-semibold text-left w-full pl-10">
        My Invitations
      </h1>
      <Separator className="my-3" />
      <div className="w-full flex flex-col justify-start items-center max-w-[1000px] p-4 ">
        <section className="w-full max-w-[600px] h-[700px] mx-4 flex flex-col justify-center items-center p-2 border rounded-lg">
          {loading ? (
            <Loader
              params={{
                support_text: "Looking for your invitations! Please Wait!",
                full_h: true,
              }}
            />
          ) : invitations.length < 1 ? (
            <Placeholder
              params={{
                Icon: MailSearch,
                title: "No Invites Found!",
                description:
                  "Looks like curerntly you dont have any invites. Check later for any updates.",
              }}
            />
          ) : (
            <ScrollArea className="w-full h-full max-h-[700px] pr-5">
              {invitations.map((invite) => {
                return <InvitationCard params={invite} key={invite.id} />;
              })}
            </ScrollArea>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyInvitations;
