"use client";
import { Spinner } from "../ui/spinner";

const Loader = ({ params }: { params: { support_text: string } }) => {
  const { support_text } = params;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Spinner className="size-12 text-gray-500 mb-2.5" />
      <p className="text-muted-foreground text-lg">{support_text}</p>
    </div>
  );
};

export default Loader;
