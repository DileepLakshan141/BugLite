"use client";

import { PROJECT } from "@/types/data_types";
import dayjs from "dayjs";
import { Clock, Sprout } from "lucide-react";
import { Button } from "../ui/button";

const ProjectCard = ({ params }: { params: { project: PROJECT } }) => {
  const { project } = params;
  return (
    <div className="w-[300px] h-[350px] rounded-lg border-2 flex flex-col shadow-xl overflow-hidden">
      {/* design part */}
      <div className="w-full h-[140px] project-card-pattern"></div>
      {/* text container */}
      <div className="w-full flex-1 bg-white p-1 flex flex-col justify-start items-start">
        <h2 className="text-lg font-semibold">{project.name}</h2>
        <p className="line-clamp-3 text-md text-clip text-muted-foreground my-2">
          {project.description}
        </p>
        <div className="w-full flex justify-start items-center">
          <Clock className="size-4" />
          <p className="ml-2 text-sm font-semibold italic">
            Created On: {dayjs(project.createdAt).format("DD MMM, YYYY")}
          </p>
        </div>
        <Button className="w-full mt-3" variant="link">
          <Sprout /> View Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
