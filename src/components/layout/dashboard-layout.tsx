import { CircleGauge, CirclePlus, List } from "lucide-react";
import React, { Suspense } from "react";
import { Outlet } from "react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { Loading } from "@/components/loading";
import { SidebarComponent } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: CircleGauge },
  { title: "Job List", url: "/list-job", icon: List },
  { title: "Add New Job", url: "/add-job", icon: CirclePlus },
];
export const DashboardLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SidebarProvider>
        <SidebarComponent menuItems={menuItems} />
        <div className="w-full">
          <SidebarInset className="sticky top-0 z-10 ">
            <DashboardHeader />
          </SidebarInset>
          <div className="relative p-4 ">{<Outlet />}</div>
        </div>
      </SidebarProvider>
    </Suspense>
  );
};
