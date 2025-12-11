"use client";
import { LucideIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

const Placeholder = ({
  params,
}: {
  params: { title: string; description: string; Icon: LucideIcon };
}) => {
  const { title, description, Icon } = params;
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{Icon && <Icon />}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default Placeholder;
