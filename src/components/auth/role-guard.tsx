"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";


import AuthLoading from "./auth-loading";
import { UserRole } from "../types";
import { useGetMe } from "../hooks/auth.hook";
import AccessDenied from "./access-denied";

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({
  children,
  roles,
}: RoleGuardProps) {
  const router = useRouter();

  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router]);

  // Checking authentication
  if (isPending) {
    return <AuthLoading />;
  }

  // Not authenticated
  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  // Authorized role
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Logged in but wrong role
  return <AccessDenied />;
}