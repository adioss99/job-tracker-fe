import { PanelsTopLeft } from "lucide-react";
import React, { Suspense } from "react";
import { Outlet } from "react-router";

import { Loading } from "@/components/loading";
import { SidebarComponent } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

export const MobileToggleButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button className="md:hidden p-2" variant="ghost" onClick={toggleSidebar}>
      <PanelsTopLeft />
    </Button>
  );
};

const menuItems = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Job List", url: "#" },
  { title: "Add Job", url: "#" },
];
export const DashboardLayout: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SidebarProvider>
        <MobileToggleButton />
        <SidebarComponent menuItems={menuItems} />
        <div className="p-5">{<Outlet />}</div>
      </SidebarProvider>
    </Suspense>
  );
};
