"use client";

import Loading from "@/app/loading";
import Logo from "@/assets/svg/Logo";
import RegisterForm from "@/components/forms/register-form";

import { useGetMe } from "@/components/hooks/auth.hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const { data, isPending } = useGetMe();

  useEffect(() => {
    if (isPending) return;

    const user = data?.data;

    if (!user) return;

    if (user.role === "ADMIN") {
      router.replace("/admin/dashboard");
      return;
    }

    if (user.role === "COMPANY") {
      router.replace("/company/dashboard");
      return;
    }

    if (user.role === "CANDIDATE") {
      router.replace("/candidate/dashboard");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Logo />
              <span>Code Assess</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/register.webp"
          alt="Code Assess register"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}