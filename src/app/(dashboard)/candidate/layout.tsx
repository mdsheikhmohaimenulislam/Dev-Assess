import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

import { ReactNode } from "react";

export default function CandidateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["CANDIDATE"]}>
      <DashboardShell userRole="CANDIDATE">{children}</DashboardShell>
    </RoleGuard>
  );
}