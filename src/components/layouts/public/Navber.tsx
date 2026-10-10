"use client";

import { useState } from "react";
import Logo from "@/assets/svg/Logo";
import { useGetMe } from "@/components/hooks/auth.hook";
import { UserRole } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";

const routes = [
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

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useGetMe();

  const role = data?.data?.role as UserRole | undefined;

  const isLoggedIn = Boolean(data?.data);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">Code Assess</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className={`text-sm transition-colors ${
                isActive(route.url)
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {route.name}
            </Link>
          ))}

          {role && (
            <Link
              href={dashboardRoute[role]}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                isActive(dashboardRoute[role])
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden md:block">
          {isLoading ? (
            <Button variant="outline" disabled>
              Loading...
            </Button>
          ) : isLoggedIn ? (
            <Logout />
          ) : (
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                onClick={closeMenu}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(route.url)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {route.name}
              </Link>
            ))}

            {/* Dashboard */}
            {role && (
              <Link
                href={dashboardRoute[role]}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(dashboardRoute[role])
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            )}

            {/* Mobile Authentication */}
            <div className="mt-3 border-t pt-4">
              {isLoggedIn ? (
                <Logout />
              ) : (
                <Button className="w-full">
                  <Link href="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
