import { Suspense } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

import { Loading } from "@/components/loading";

export const AppLayout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full flex items-center justify-center bg-[#eff3fa]">
        <ToastContainer
          autoClose={3000}
          pauseOnFocusLoss={false}
          closeOnClick
        />
        {<Outlet />}
      </div>
    </Suspense>
  );
};
