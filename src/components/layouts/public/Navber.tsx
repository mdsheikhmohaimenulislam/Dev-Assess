"use client";

import Logo from "@/assets/svg/Logo";
import { useGetMe, useLogout } from "@/components/hooks/auth.hook";
import { UserRole } from "@/components/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function Navbar() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Assessments", url: "/assessments" },
    { name: "Problems", url: "/problems" },
    { name: "Companies", url: "/companies" },
    { name: "About", url: "/about" },
    { name: "FAQ", url: "/faq" },
  ];

  const dashboardRoute: Record<UserRole, string> = {
    ADMIN: "/admin/dashboard",
    COMPANY: "/company/dashboard",
    CANDIDATE: "/candidate/dashboard",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  const role = data?.data?.role as UserRole | undefined;

console.log(data?.data);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You have been logged out successfully.",
          type: "success",
        });

        queryClient.removeQueries({
          queryKey: ["user"],
        });
      },

      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="h-16 w-full border-b">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">Code Assess</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Authentication */}
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Login
            </Button>
          )}

{isLoading ? (
  <Button variant="outline" disabled>
    Loading...
  </Button>
) : data ? (
  <Button
    className="cursor-pointer"
    variant="destructive"
    onClick={handleLogout}
  >
    Logout
  </Button>
) : null}
        </div>
      </div>
    </header>
  );
}
