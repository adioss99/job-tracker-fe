import { LogOut, Settings, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useLogout } from "@/hooks/use-auth";

type MenuItem = {
  title: string;
  url: string;
};
type SidebarComponentProps = {
  menuItems: MenuItem[];
};

const DropDownMenuItem = () => {
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link className="w-full" to="/profile">
            <Button className="w-full" variant={"outline"}>
              Profile <UserRound className="text-black" />
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handleLogout}>
            Logout <LogOut className="text-white" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const SidebarComponent: React.FC<SidebarComponentProps> = ({
  menuItems,
}) => {
  return (
    <>
      <Sidebar
        className="bg-amber-500"
        collapsible="offcanvas"
        side="left"
        variant="sidebar">
        <SidebarHeader>
          <Link
            className="flex flex-row justify-center w-full mb-2 mt-4"
            to="/">
            <img
              alt="web-logo"
              className="w-8"
              src="/web-app-manifest-192x192.png"
            />
            <h1 className="text-2xl font-bold ml-2">JobTrack</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        className="w-full text-gray-800 font-medium"
                        to={item.url}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropDownMenuItem />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
