import { LogOut, Settings, UserRound, type LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
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
  icon: LucideIcon;
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
  menuItems: items,
}) => {
  const { pathname } = useLocation();
  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/");
  };
  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <Link
            className="flex flex-row justify-center w-full mb-2 mt-4"
            to="/">
            <img
              alt="web-logo"
              className="w-8"
              src="/web-app-manifest-192x192.png"
            />
            <h1 className="truncate text-2xl font-bold ml-2">JobTrack</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={
                        " font-medium " +
                        (isActive(item.url)
                          ? "bg-black text-white hover:bg-black hover:text-white"
                          : "hover:bg-gray-200")
                      }
                      variant="default"
                      asChild>
                      <Link className="flex items-center gap-2" to={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
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
