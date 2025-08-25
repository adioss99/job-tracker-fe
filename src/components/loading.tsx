import { Loader2Icon } from "lucide-react";

export const Loading = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-[#eff3fa]">
        <Loader2Icon className="animate-spin" />
        Loading..
      </div>
    </>
  );
};
