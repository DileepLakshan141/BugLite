"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import axios, { AxiosError } from "axios";
import useUserStore from "@/utils/zustand/store";
import { toast } from "sonner";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const MyInvitations = () => {
  const { getUser } = useUserStore();
  const user = getUser();

  const getAllInvitiationsForUser = async () => {
    try {
      const response = await axios.get(`/api/invitations/${user?.id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
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
      <div className="w-full flex flex-col justify-start items-start mt-[90px] max-w-[1000px] p-4 ">
        <ScrollArea className="w-full h-full max-h-[700px] pr-5"></ScrollArea>
      </div>
    </div>
  );
};

export default MyInvitations;
