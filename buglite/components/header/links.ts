import { LINK } from "@/types/link_types";
import {
  BellDot,
  FolderGit,
  Handshake,
  LayoutDashboard,
  Mail,
} from "lucide-react";

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
    name: "My Contributions",
    link: "/dashboard/contributions",
    icon: Handshake,
  },
  {
    name: "My Invitations",
    link: "/dashboard/invitations",
    icon: Mail,
  },
  {
    name: "Notifications",
    link: "/dashboard/notifications",
    icon: BellDot,
  },
];
