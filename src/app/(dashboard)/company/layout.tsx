import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["COMPANY"]}>
      <DashboardShell userRole="COMPANY">{children}</DashboardShell>
    </RoleGuard>
  );
}
