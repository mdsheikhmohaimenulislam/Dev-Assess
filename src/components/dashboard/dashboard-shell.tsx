import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRole } from "@/components/types";
import { ReactNode } from "react";

import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardShellProps {
  children: ReactNode;
  userRole: UserRole;
}

export default function DashboardShell({
  children,
  userRole,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={userRole} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
