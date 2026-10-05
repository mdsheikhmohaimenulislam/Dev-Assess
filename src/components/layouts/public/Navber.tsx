"use client";

import Logo from "@/assets/svg/Logo";
import { useGetMe } from "@/components/hooks/auth.hook";
import { UserRole } from "@/components/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
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

  const role = data?.data?.role as UserRole | undefined;

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-background">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">Code Assess</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          {routes.map((route) => {
            const isActive = pathname === route.url;

            return (
              <Link
                key={route.url}
                href={route.url}
                className={`transition-colors ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {route.name}
              </Link>
            );
          })}

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
          {isLoading ? (
            <Button variant="outline" disabled>
              Loading...
            </Button>
          ) : data ? (
            <Logout />
          ) : (
            <Button
              variant="outline"
              render={<Link href="/login" />}
              nativeButton={false}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}