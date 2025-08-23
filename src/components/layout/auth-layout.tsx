import { Suspense } from "react";
import { Outlet } from "react-router";

import { Loading } from "@/components/loading";

import { useTitle } from "@/stores/use-title";

export const AuthLayout = () => {
  const getTItle = useTitle((state) => state.title);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col items-start px-5 py-7 sm:w-sm justify-center rounded-xl bg-white gap-2">
        <div className="flex flex-row justify-center content-center w-full mb-4">
          <img
            alt="web-logo"
            className="w-8"
            src="/web-app-manifest-192x192.png"
          />
          <h1 className="text-2xl font-bold ml-1 text-gray-700 ">JobTrack</h1>
          <span className="mx-2 my-auto">|</span>
          <h6 className="text-lg font-semibold my-auto text-gray-700">
            {getTItle}
          </h6>
        </div>
        {<Outlet />}
      </div>
    </Suspense>
  );
};
