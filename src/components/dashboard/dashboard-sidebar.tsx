"use client";

import Logo from "@/assets/svg/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/components/types";

import { SidebarItems } from "@/components/types/sidebar.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes, candidateRoutes, companyRoutes } from "../routes";
import Logout from "../layouts/public/Logout";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  ADMIN: adminRoutes,
  COMPANY: companyRoutes,
  CANDIDATE: candidateRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const routes = sidebarRoutes[role] ?? [];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">Code Assess</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
      </SidebarContent>
<Logout/>
      <SidebarRail />
    </Sidebar>
  );
}
