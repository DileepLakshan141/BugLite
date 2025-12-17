"use client";
import HeaderComponent from "@/components/header/Header";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { FolderGit2 } from "lucide-react";
import useUserStore from "@/utils/zustand/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader/Loader";
import { CONTRIBUTION } from "@/types/data_types";
import ProjectCard from "@/components/project_card/ProjectCard";

const MyContributions = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [projects, setProjects] = useState<CONTRIBUTION[]>([]);
  const { getUser } = useUserStore();
  const user = getUser();

  useEffect(() => {
    const fetchUserSpecificContributions = async () => {
      const userId = user?.id;
      try {
        setFetching(true);
        const response = await axios.get(`/api/contributors/user/${userId}`);
        console.log(response.data);

        if (response.data?.success) {
          setProjects(response.data.contributions);
          toast.success("User specific projects retrieved!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("user specific project fetching failed");
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    fetchUserSpecificContributions();
  }, [user?.id]);

  if (fetching) {
    return (
      <Loader
        params={{
          support_text: "Please wait while we look for your projects!",
          full_h: false,
        }}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <HeaderComponent />
      <div className="w-full flex flex-col justify-start items-start mt-[90px] p-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Contributions</h1>
        </div>
        <Separator className="my-3" />
        {/* my projects container */}
        <div className="w-full flex justify-center items-center">
          {!fetching && projects.length < 1 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderGit2 />
                </EmptyMedia>
                <EmptyTitle>No recently contributed projects found!</EmptyTitle>
                <EmptyDescription>
                  Looks like currently you have no contributed projects. This
                  section will display the infomation related to your projects
                  once you accept Collaboration invitation.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="w-full mx-4 max-w-[1000px] flex justify-center flex-wrap gap-4">
              {projects.map((project: CONTRIBUTION) => {
                const contribution = project.project;
                return (
                  <ProjectCard
                    key={project.id}
                    params={{ project: contribution }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyContributions;
