"use client";
import HeaderComponent from "@/components/header/Header";
import Placeholder from "@/components/Placeholder/Placeholder";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Separator } from "@/components/ui/separator";
import { Brain, Contact, Feather } from "lucide-react";
import { use } from "react";

const ProjectInformation = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const unwrapped = use(params);
  const { projectId } = unwrapped;
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <HeaderComponent />
      <div className="w-full flex flex-col justify-start items-start mt-[90px] p-4">
        <div className="w-full flex justify-center items-center gap-2 mb-4">
          <ButtonGroup>
            <ButtonGroup>
              <Button size="lg" variant="outline">
                New Activity Record
              </Button>
              <Button size="lg" variant="outline">
                Add Collaborator
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
        <div className="w-full max-w-[1000px] m-auto grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* main stripe for activity log */}
          <div className="p-2 flex flex-col justify-center items-start border rounded-lg md:row-span-2 h-[700px] md:h-auto">
            <h1 className="text-xl font-semibold ml-4">Activity Log</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Activities Yet!",
                description:
                  "Be the first one to create a new activity for this project! Activity log is currently empty.",
                Icon: Feather,
              }}
            />
          </div>
          {/* project collaborators/contributors */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Collaborators</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Collaborators!",
                description:
                  "This project currently does not have any collaborators. Try to add some and get start the working!",
                Icon: Contact,
              }}
            />
          </div>
          {/* project insights and infomation */}
          <div className="p-2 flex flex-col justify-center items-start w-full border rounded-lg h-[350px] md:col-start-2 max-w-[450px]">
            <h1 className="text-xl font-semibold ml-4">Project Insights</h1>
            <Separator className="my-2" />
            <Placeholder
              params={{
                title: "No Insights Yet!",
                description:
                  "This project is not yet have enough activity log records to display the project insights. This section will be available once you work with the project.",
                Icon: Brain,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
