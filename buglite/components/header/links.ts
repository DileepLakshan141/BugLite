import { LINK } from "@/types/link_types";
import { BellDot, Bug, FolderGit, LayoutDashboard } from "lucide-react";

export const link_data: LINK[] = [
  {
    name: "Dashboard",
    link: "/dashboard/home",
    icon: LayoutDashboard,
  },
  {
    name: "My Projects",
    link: "/dashboard/projects",
    icon: FolderGit,
  },
  {
    name: "Bug Details",
    link: "/dashboard/bugs",
    icon: Bug,
  },
  {
    name: "Notifications",
    link: "/dashboard/notifications",
    icon: BellDot,
  },
];
