import { CircleGauge, CirclePlus, List } from "lucide-react";
import React, { Suspense } from "react";
import { Outlet } from "react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { Loading } from "@/components/loading";
import { SidebarComponent } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: CircleGauge },
  { title: "Job List", url: "/job", icon: List },
  { title: "Add New Job", url: "/job-add", icon: CirclePlus },
];
export const DashboardLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SidebarProvider>
        <SidebarComponent menuItems={menuItems} />
        <div className="h-screen w-screen overflow-y-auto overflow-hidden py-0 sm:py-3">
          <SidebarInset className="rounded-2xl min-h-full">
            <DashboardHeader />
            <Separator />
            <div className="flex-1 overflow-y-auto p-4">{<Outlet />}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Suspense>
  );
};
